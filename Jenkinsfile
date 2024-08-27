pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ayegwalo/my_jenkins_project.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t my-node-app jenkins-node-app/'
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh 'docker run -d -p 3000:3000 my-node-app'
                }
            }
        }
    }
}
