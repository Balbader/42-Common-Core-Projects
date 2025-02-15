#!/bin/bash

# Wait for database launching

while ! pg_isready -h $SQL_HOST -p $SQL_PORT -U $SQL_USER > /dev/null 2>&1; do
	echo "Waiting for PostgreSQL to be ready..."
	sleep 1
done

echo "PostgreSQL started"
python /app/manage.py runserver 0.0.0.0:8000
exec "$@"
