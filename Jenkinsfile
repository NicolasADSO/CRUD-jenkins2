pipeline {
    agent any

    stages {
        stage('Clonar código') {
            steps {
               git url: 'https://github.com/NicolasADSO/CRUD.git', branch: 'main'
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
