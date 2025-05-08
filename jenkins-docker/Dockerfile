FROM jenkins/jenkins:lts

USER root

# Instala Docker y Docker Compose CLI dentro de Jenkins
RUN apt-get update && \
    apt-get install -y docker.io docker-compose

USER jenkins
