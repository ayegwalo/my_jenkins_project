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
        // Stages remain the same as in the previous Jenkinsfile
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