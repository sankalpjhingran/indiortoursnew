pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                echo 'Checking out SCM'
                checkout([$class: 'GitSCM', branches: [[name: '*/jenkins']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/sankalpjhingran/indiortoursnew']]])
            }
        }

        stage('build') {
            steps {
                sh 'cd client && npm install grunt-cli && npm install grunt --save-dev && npm install && grunt build'
                echo 'Build finished'
            }
        }

        stage('deploy') {
            steps {
                withGroovy(tool: '4.0.8') {
                  sh 'groovy --version'
                }
            }
        }
    }
}
