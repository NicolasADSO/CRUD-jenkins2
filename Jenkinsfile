pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'tienda_crud'
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                git credentialsId: 'github-token-id', url: 'https://github.com/NicolasADSO/CRUD.git', branch: 'main'
            }
        }

        stage('Construir imagen Docker') {
            steps {
                sh 'docker build -t tienda-app .'
            }
        }

        stage('Test (opcional)') {
            steps {
                // Cambia esto según cómo ejecutes los tests
                sh 'echo "No hay tests definidos aún"' 
            }
        }

        stage('Levantar contenedores') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada'
        }
    }
}
