pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "tienda-crud"
  }

  stages {
    stage('Clonar repositorio') {
      steps {
        echo '📥 Código clonado automáticamente por Jenkins'
      }
    }

    stage('Construir imagen Docker') {
      steps {
        sh 'docker compose build'
      }
    }

    stage('Reiniciar contenedores') {
      steps {
        // Elimina contenedores existentes si están en uso
        sh 'docker rm -f mysql_db || true'
        sh 'docker rm -f app_3000 || true'
        sh 'docker rm -f app_4000 || true'

        sh 'docker compose down'
        sh 'docker compose up -d'
      }
    }
  }

  post {
    success {
      echo '✅ Despliegue exitoso'
    }
    failure {
      echo '❌ Algo falló en el pipeline'
    }
  }
}
