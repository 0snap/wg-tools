FROM python:3.5

RUN pip install flask
RUN pip install flask-jwt
RUN pip install mongoengine

COPY server.py server.py
COPY deptCalculator.py deptCalculator.py
COPY storage.py storage.py

COPY secret secret
COPY salt salt

RUN chmod +x server.py

CMD python server.py
EXPOSE 5000
