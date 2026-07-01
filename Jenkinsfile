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
                // sh './build.sh'
                sh 'cd frontend && ng build'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing..'
                // sh './test.sh'
            }
        }

    }
}
