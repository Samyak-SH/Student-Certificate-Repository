pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        BACKEND_IMAGE = "samyak2005/scr-server:latest"
        FRONTEND_IMAGE = "samyak2005/scr_client:latest"
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

        stage('Build & Push Image') {
            steps {
                bat """
                @docker build -t %BACKEND_IMAGE% .\\server
                @docker build -t %FRONTEND_IMAGE% .\\client
                @docker push %BACKEND_IMAGE%
                @docker push %FRONTEND_IMAGE%
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

        stage('Deploy Frontend using Docker compose'){
            steps {
                bat """
                docker compose stop frontend
                docker compose rm -f frontend

                docker compose pull frontend
                docker compose up -d frontend
                """
            }
        }
    }

    post {
        success {
            echo 'Backend deployment successful'
        }

        failure {
            echo 'Deployment failed'
        }

        always {
            bat 'docker system prune -f'
        }
    }
}