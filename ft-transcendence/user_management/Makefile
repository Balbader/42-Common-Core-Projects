
all:
	docker compose up -d --build
	docker compose exec backend python manage.py makemigrations
	docker compose exec backend python manage.py migrate --noinput
	docker compose exec backend python manage.py collectstatic --no-input --clear

d:
	docker compose down -v

clean: d
	docker rmi $(shell docker images -q) -f
	docker builder prune -f
	docker system prune -f
