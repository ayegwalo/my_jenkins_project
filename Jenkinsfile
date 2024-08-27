pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git
                git 'https://github.com/ayegwalo/my_jenkins_project.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    docker.build('my-node-app')
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    // Run the Docker container
                    docker.run('my-node-app', '-p 3000:3000')
                }
            }
        }
    }
    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
    }
}
