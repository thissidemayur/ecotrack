pipeline {

```
agent any

environment {
    PROJECT_DIR = "/home/ubuntu/ecotrack"
}

stages {

    stage('Pull Latest Code') {
        steps {
            echo "Pulling latest code from GitHub"

            dir("${PROJECT_DIR}") {
                sh '''
                    git fetch origin
                    git reset --hard origin/main
                '''
            }
        }
    }

    stage('Build Docker Images') {
        steps {
            echo "Building Docker images"

            dir("${PROJECT_DIR}") {
                sh 'docker compose build'
            }
        }
    }

    stage('Deploy Containers') {
        steps {
            echo "Deploying containers"

            dir("${PROJECT_DIR}") {
                sh '''
                    docker compose down
                    docker compose up -d
                '''
            }
        }
    }

    stage('Verify Deployment') {
        steps {
            echo "Checking backend health"

            sh '''
                sleep 10
                curl -f http://localhost:5000/api/v1/health
            '''
        }
    }

    stage('Cleanup Docker Images') {
        steps {
            echo "Cleaning old images"

            sh '''
                docker image prune -f
            '''
        }
    }
}

post {

    success {
        echo 'Deployment Successful'
    }

    failure {
        echo 'Deployment Failed'
    }

    always {
        echo 'Pipeline Finished'
    }
}
```

}
