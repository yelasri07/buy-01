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
            steps {
                echo 'Building..'
                sh './build.sh'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing..'
                sh './test.sh'
            }
        }

    }
}
