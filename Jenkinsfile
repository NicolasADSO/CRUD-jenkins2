pipeline {
    agent any
    environment {
        DOCKER_HOST = 'tcp://docker:2375'
    }
    stages {
        stage('Clonar código') {
            steps {
                git url: 'https://github.com/NicolasADSO/CRUD.git', branch: 'main'
            }
        }

        stage('Construir imagen Docker') {
            steps {
                sh 'docker build -t tienda-app .'
            }
        }

        stage('Levantar contenedores con Docker Compose') {
            steps {
                sh '''
                docker-compose down || true
                docker-compose up -d
                '''
            }
        }
    }
}
