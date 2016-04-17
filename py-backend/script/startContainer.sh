#!/bin/sh

docker run --net=host -p 5000:5000 -t py-backend:latest
