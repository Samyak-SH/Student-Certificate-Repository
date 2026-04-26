pipeline {
    agent any

    environment {
        BACKEND_IMAGE  = "samyak2005/scr-server:latest"
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
                    bat '@docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Build & Push Images') {
            steps {
                bat """
                @docker build -t %BACKEND_IMAGE% .\\server
                @docker build -t %FRONTEND_IMAGE% .\\client

                @docker push %BACKEND_IMAGE%
                @docker push %FRONTEND_IMAGE%
                """
            }
        }

        stage('Enable Ingress') {
            steps {
                bat '@minikube addons enable ingress'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat """
                @kubectl apply -f k8s\\backend-deployment.yaml
                @kubectl apply -f k8s\\backend-service.yaml
                @kubectl apply -f k8s\\frontend-deployment.yaml
                @kubectl apply -f k8s\\frontend-service.yaml
                @kubectl apply -f k8s\\ingress.yaml

                @kubectl rollout restart deployment/backend
                @kubectl rollout restart deployment/frontend

                @kubectl rollout status deployment/backend
                @kubectl rollout status deployment/frontend
                """
            }
        }

        stage('Done') {
            steps {
                echo 'Open http://studentrepo.local'
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