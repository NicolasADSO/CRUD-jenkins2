pipeline {
  agent any

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
        sh 'docker compose rm -sf'
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
