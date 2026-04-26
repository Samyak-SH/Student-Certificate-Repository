pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "samyak2005/scr-server:latest"
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
                    bat '@docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Build & Push Backend Image') {
            steps {
                bat """
                @docker build -t %BACKEND_IMAGE% .\\server
                @docker push %BACKEND_IMAGE%
                """
            }
        }

        stage('Deploy Backend to Kubernetes') {
            steps {
                bat """
                @kubectl apply -f k8s\\backend-service.yaml
                @kubectl apply -f k8s\\backend-deployment.yaml

                @kubectl rollout restart deployment/backend
                @kubectl rollout status deployment/backend
                """
            }
        }

        // stage('Show Backend URL') {
        //     steps {
        //         echo 'Backend available at: http://localhost:30080 (try this first)'
        //         echo 'If needed use: minikube ip + :30080'
        //     }
        // }
    }

    post {
        success {
            echo 'Backend deployment successful'
        }

        failure {
            echo 'Deployment failed'
        }
    }
}