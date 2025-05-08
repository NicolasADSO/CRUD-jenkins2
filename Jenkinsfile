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
        echo '🐳 Construyendo app_3000 y app_4000 sin tocar la base de datos'
        sh 'docker-compose build --no-cache app app2'
      }
    }

    stage('Reiniciar servicios de la app') {
      steps {
        echo '🔁 Reiniciando app_3000 y app_4000 sin borrar la base de datos'
        sh 'docker-compose stop app app2 || true'
        sh 'docker-compose rm -f app app2 || true'
        sh 'docker-compose up -d app app2'
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
