#!/bin/sh

npm run clean
npm run test
npm run build

docker build -t wg-tools/frontend:latest .

