FROM python:3.5

RUN pip install flask
RUN pip install mongoengine

ADD server.py server.py
ADD deptCalculator.py deptCalculator.py
RUN chmod +x server.py

CMD python server.py
EXPOSE 5000