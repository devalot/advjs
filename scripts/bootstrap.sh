#!/bin/sh
set -e

################################################################################
# Download dependencies.
npm install --no-progress --silent

################################################################################
# Prepare the Vue.js demo application
cd www/frameworks/vue
npm install --no-progress --silent
npm run build
