#!/usr/bin/env bash
set -o errexit

npm install --omit=dev
npm run migrate up
