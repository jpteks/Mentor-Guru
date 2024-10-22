dev:
	docker compose -f compose-dev.yaml up --build 

deploy:
	docker compose up -d

db:
	docker compose -f compose-db.yaml up --build 

remove:
	docker compose down
	docker container prune 


#sudo chown -R $(whoami):$(whoami) ./dist
#export GID=$(id -g)
#export UID=$(id -u)


