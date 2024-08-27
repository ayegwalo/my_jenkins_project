pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                dir('jenkins-node-app') {
                    script {
                        sh 'docker build -t my-node-app .'
                    }
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container
                    sh 'docker run -d -p 3000:3000 my-node-app'
                }
            }
        }
    }
}
