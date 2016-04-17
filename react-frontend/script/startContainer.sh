#!/bin/sh

docker run --net=host -p 3000:3000 -t wg-tools/frontend:latest
