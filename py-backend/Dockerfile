FROM python:3.5

RUN pip install flask
RUN pip install flask-jwt
RUN pip install mongoengine
RUN pip install gunicorn

COPY server.py server.py
COPY deptCalculator.py deptCalculator.py
COPY storage.py storage.py

VOLUME ['./secrets']

COPY script/server.sh script/server.sh
CMD script/server.sh

EXPOSE 5000