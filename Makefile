build:
	docker build -t bank_api .

up:
	docker-compose up -d

up-logs:
	docker-compose up

run-db:
	docker-compose up -d db_postgres

run-db-logs:
	docker-compose up db_postgres

run: build up
