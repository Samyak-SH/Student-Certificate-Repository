pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "student-certificate-repository"
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Samyak-SH/Student-Certificate-Repository'
            }
        }

        stage('Build') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                    docker compose up -d
                '''
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