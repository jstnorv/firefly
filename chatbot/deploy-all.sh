#!/bin/bash
# Usage: ./deploy-all.sh "Your commit message here"

git add .
git commit -m "${1:-Auto commit and deploy}"
git push
npm run deploy:all
