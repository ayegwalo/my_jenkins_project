pipeline {
    agent any

    options {
        durabilityHint('PERFORMANCE_OPTIMIZED')
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        GIT_REPO_URL = 'https://github.com/ayegwalo/my_jenkins_project.git'
        APP_DIR = 'jenkins-node-app'
        IMAGE_NAME = 'my-node-app'
        CONTAINER_PORT = '3000'
        HOST_PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the repository
                git url: "${env.GIT_REPO_URL}", branch: 'main'
            }
        }

        stage('Build') {
            steps {
                dir("${env.APP_DIR}") {
                    // Install dependencies and build the application
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir("${env.APP_DIR}") {
                    // Run tests
                    sh 'npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Build Docker image
                    sh "docker build -t ${env.IMAGE_NAME} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy the Docker container
                    sh "docker run -d -p ${env.HOST_PORT}:${env.CONTAINER_PORT} ${env.IMAGE_NAME}"
                }
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            // Additional actions on success
            echo 'Pipeline succeeded!'
        }
        failure {
            // Additional actions on failure
            echo 'Pipeline failed!'
            slackSend channel: '#jenkins-builds',
                      color: 'danger',
                      message: "Job '${JOB_NAME}' (${BUILD_NUMBER}) failed! Check console output: ${BUILD_URL}"
        }
    }
}
