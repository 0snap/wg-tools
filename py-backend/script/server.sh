#!/bin/sh

export MONGO_ENDPOINT="mongo:27017"

gunicorn server:app -b 0.0.0.0:5000
