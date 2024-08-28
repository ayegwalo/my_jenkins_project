pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/ayegwalo/my_jenkins_project.git'
        APP_DIR = '.' 
        IMAGE_NAME = 'my-node-app'
        CONTAINER_PORT = '3000'
        HOST_PORT = '3000'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Checkout the code
                checkout([$class: 'GitSCM',
                          userRemoteConfigs: [[url: "${GIT_REPO_URL}"]],
                          branches: [[name: '*/main']]])
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build Docker image
                dir("${APP_DIR}") {
                    sh script: 'docker build -t ${IMAGE_NAME} .', label: 'Build Docker Image'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests (assuming you have a test script)
                dir("${APP_DIR}") {
                    sh script: 'npm install', label: 'Install Dependencies'
                    sh script: 'npm test', label: 'Run Tests'
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                // Stop and remove any existing containers
                sh script: 'docker stop $(docker ps -q --filter ancestor=${IMAGE_NAME}) || true', label: 'Stop Containers'
                sh script: 'docker rm $(docker ps -aq --filter ancestor=${IMAGE_NAME}) || true', label: 'Remove Containers'

                // Run Docker container
                sh script: 'docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} ${IMAGE_NAME}', label: 'Run Docker Container'
            }
        }

        stage('Notify') {
            steps {
                // Send a notification (e.g., Slack)
                slackSend channel: '#jenkins-builds',
                          color: 'good',
                          message: "Job '${JOB_NAME}' (${BUILD_NUMBER}) is successful! Check console output: ${BUILD_URL}"
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