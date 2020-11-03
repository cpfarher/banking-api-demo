build:
	docker build -t bank_api .

up:
	docker-compose up -d

run: build up
