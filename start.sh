export DUID=$(id -u) 
export DGID=$(id -g) 
export APPS=$1
docker compose up $APPS -d
