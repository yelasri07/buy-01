pipeline {

    agent {
        node {
            label 'docker-agent'
        }
    }
    triggers {
        pollSCM('* * * * *')
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh '''
                echo "Hello woooorld.."
                '''
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh '''
                echo "doing test stuff.."
                '''
            }
        }
        stage('Deliver') {
            steps {
                echo 'Deliver....'
                sh '''
                echo "doing delivery stuff.."
                '''
            }
        }
    }
}
