pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "samyak2005"
        BACKEND_IMAGE = "samyak2005/scr-server:latest"
        FRONTEND_IMAGE = "samyak2005/scr-client:latest"
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Samyak-SH/Student-Certificate-Repository'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    bat "docker build -t %BACKEND_IMAGE% .\\server"
                    bat "docker build -t %FRONTEND_IMAGE% .\\client"

                    // Jenkins machine should already be docker login authenticated
                    bat "docker push %BACKEND_IMAGE%"
                    bat "docker push %FRONTEND_IMAGE%"
                }
            }
        }

        stage('Create Kubernetes Secret') {
            steps {
                withCredentials([
                    string(credentialsId: 'mongo-url', variable: 'MONGO_URL'),
                    string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET')
                ]) {
                    bat '''
                    kubectl delete secret backend-secret --ignore-not-found

                    kubectl create secret generic backend-secret ^
                    --from-literal=MONGODBURL=%MONGO_URL% ^
                    --from-literal=SECRET_KEY=%JWT_SECRET%
                    '''
                }
            }
        }

        stage('Deploy Backend to Kubernetes') {
            steps {
                bat """
                    kubectl apply -f k8s\\backend-service.yaml
                    kubectl apply -f k8s\\backend-deployment.yaml

                    kubectl rollout restart deployment/backend
                    kubectl rollout status deployment/backend
                """
            }
        }

        stage('Get Backend URL') {
            steps {
                script {
                    def miniIP = bat(
                        script: 'minikube ip',
                        returnStdout: true
                    ).trim()

                    def nodePort = bat(
                        script: '''
                        for /f "tokens=*" %%i in ('kubectl get svc backend -o jsonpath="{.spec.ports[0].nodePort}"') do @echo %%i
                        ''',
                        returnStdout: true
                    ).trim()

                    env.BACKEND_URL = "http://${miniIP}:${nodePort}"
                    echo "Backend URL = ${env.BACKEND_URL}"
                }
            }
        }

        stage('Deploy Frontend Docker Container') {
            steps {
                bat """
                    docker rm -f scr-frontend || exit /b 0

                    docker run -d ^
                    --name scr-frontend ^
                    -p 5173:5173 ^
                    -e VITE_SERVER_URL=%BACKEND_URL% ^
                    %FRONTEND_IMAGE%
                """
            }
        }

        stage('Cleanup') {
            steps {
                bat 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo 'Deployment successful'
        }

        failure {
            echo 'Deployment failed'
        }
    }
}