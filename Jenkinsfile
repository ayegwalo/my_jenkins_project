pipeline {
    agent any

    environment {
        GIT_REPO_URL = 'https://github.com/ayegwalo/my_jenkins_project.git'
        APP_DIR = 'jenkins-node-app'
        IMAGE_NAME = 'my-node-app'
        CONTAINER_PORT = '3000'
        HOST_PORT = '3000'
        PATH = "/usr/local/bin:${env.PATH}"  // Ensure PATH includes the directory for Node.js and dependencies
    }

    stages {
        stage('Checkout') {
            steps {
                git url: "${env.GIT_REPO_URL}", branch: 'main'
            }
        }

        stage('Build') {
            steps {
                dir("${env.APP_DIR}") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir("${env.APP_DIR}") {
                    sh 'npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Check if Docker Buildx is available, and use it if installed
                    sh 'docker buildx version || docker build -t ${env.IMAGE_NAME} .'
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
