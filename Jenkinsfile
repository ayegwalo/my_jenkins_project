pipeline {
    agent any

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
                git url: "${env.GIT_REPO_URL}", branch: 'main'
            }
        }

        stage('Setup') {
            steps {
                script {
                    // Ensure dependencies are installed
                    sh 'brew reinstall icu4c'
                    sh 'brew link --force icu4c'
                    sh 'brew reinstall node'
                }
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
                    sh "docker build -t ${env.IMAGE_NAME} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
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
