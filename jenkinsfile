pipeline {
    agent any

    stages {
        stage('Clonar código') {
            steps {
                git 'URL_DEL_REPOSITORIO'
            }
        }

        stage('Construir imagen Docker') {
            steps {
                sh 'docker build -t crud-app .'
            }
        }

        stage('Levantar contenedores') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
