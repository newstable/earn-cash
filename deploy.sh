#!/bin/bash

# Pull latest changes from Git repository
git pull origin $APP_ENV

# Run any necessary composer/npm commands
npm ci
npm run build

# Restart daemons based on environment
if [ "$APP_ENV" = "production" ]; then
    pm2 stop 0 1
    pm2 start 0 1
elif [ "$APP_ENV" = "staging" ]; then
    pm2 stop 2 3
    pm2 start 2 3
fi