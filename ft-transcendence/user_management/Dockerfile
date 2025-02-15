FROM  python:3.9

#RUN apt-get update && apt-get install -y netcat-traditional netcat-openbsd
RUN apt-get update && apt-get install -y postgresql-client
ENV   PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt


COPY . /app
RUN chmod +x /app/entrypoint.sh
RUN ls -la
RUN pwd

#CMD python /app/manage.py runserver 0.0.0.0:8000
ENTRYPOINT /app/entrypoint.sh
