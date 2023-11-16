#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.0/bin

cd Blog
 curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
 export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
 nvm install node
 npm i -g pm2
 npm install -g typescript
 cd api
 npm i
 git stash
 git pull origin main
 git stash apply
 pm2 kill
 sudo chmod -R 777 /home/ubuntu/Blog/api
 tsc
 pm2 start dist/index.js

