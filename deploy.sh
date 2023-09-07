#!/bin/bash

# Pull latest changes from Git repository
git pull origin $APP_ENV

# Run any necessary composer/npm commands
npm ci

# Restart daemons based on environment
if [ "$APP_ENV" = "production" ]; then
    npm run build
    pm2 restart 1 0
elif [ "$APP_ENV" = "staging" ]; then
    sudo -S supervisorctl restart daemon-758287:*
fi