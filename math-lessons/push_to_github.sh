#!/bin/sh
set -eu
if [ "$#" -ne 1 ]; then
  echo "Usage: sh push_to_github.sh https://github.com/USERNAME/REPOSITORY.git"
  exit 1
fi
git init
git branch -M main
git add .
git commit -m "Initial GitHub Pages deployment"
git remote add origin "$1"
git push -u origin main
