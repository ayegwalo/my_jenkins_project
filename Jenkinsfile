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
                checkout([$class: 'GitSCM',
                          userRemoteConfigs: [[url: "${GIT_REPO_URL}"]],
                          branches: [[name: '*/main']]])
            }
        }

        stage('Check Shell Availability') {
            steps {
                script {
                    try {
                        sh(script: 'echo "Shell is available"', label: 'Check Shell Availability')
                    } catch (Exception e) {
                        error("Shell command failed: ${e.message}")
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir("${APP_DIR}") {
                    script {
                        try {
                            sh(script: 'docker build -t ${IMAGE_NAME} .', label: 'Build Docker Image')
                        } catch (Exception e) {
                            error("Failed to build Docker image: ${e.message}")
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir("${APP_DIR}") {
                    script {
                        try {
                            sh(script: 'npm install', label: 'Install Dependencies')
                            sh(script: 'npm test', label: 'Run Tests')
                        } catch (Exception e) {
                            error("Failed to run tests: ${e.message}")
                        }
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    try {
                        sh(script: 'docker stop $(docker ps -q --filter ancestor=${IMAGE_NAME}) || true', label: 'Stop Containers')
                        sh(script: 'docker rm $(docker ps -aq --filter ancestor=${IMAGE_NAME}) || true', label: 'Remove Containers')
                        sh(script: 'docker run -d -p ${HOST_PORT}:${CONTAINER_PORT} ${IMAGE_NAME}', label: 'Run Docker Container')
                    } catch (Exception e) {
                        error("Failed to deploy Docker container: ${e.message}")
                    }
                }
            }
        }

        stage('Notify') {
            steps {
                script {
                    slackSend channel: '#jenkins-builds',
                              color: 'good',
                              message: "Job '${JOB_NAME}' (${BUILD_NUMBER}) is successful! Check console output: ${BUILD_URL}"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
            slackSend channel: '#jenkins-builds',
                      color: 'danger',
                      message: "Job '${JOB_NAME}' (${BUILD_NUMBER}) failed! Check console output: ${BUILD_URL}"
        }
    }
}
