pipeline {
    agent {
        node {
            label 'docker-agent'
        }
    }
    triggers {
        pollSCM '* * * * *'
    }
    stages {
        stage('Build') {
            agent {
                // This automatically spins up a Java 17 environment for this stage
                docker { image 'eclipse-temurin:17-jdk' }
            }
            steps {
                echo 'Building..'
                sh '''
                ./build.sh
                '''
            }
        }
        stage('Test') {
            agent {
                // This automatically spins up a Java 17 environment for this stage
                docker { image 'eclipse-temurin:17-jdk' }
            }
            steps {
                echo 'Testing..'
                sh '''
                ./test.sh
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
