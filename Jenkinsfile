pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code
                checkout([$class: 'GitSCM',
                          userRemoteConfigs: [[url: 'https://github.com/ayegwalo/my_jenkins_project.git']],
                          branches: [[name: '*/main']]])
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build Docker image
                sh 'docker build -t my-node-app jenkins-node-app/'
            }
        }
        stage('Run Docker Container') {
            steps {
                // Run Docker container
                sh 'docker run -d -p 3000:3000 my-node-app'
            }
        }
    }
}
