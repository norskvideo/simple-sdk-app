# Pre-reqs

- A norsk_license.json which should be placed in the 'support' folder
- NodeJS + NPM 
- Docker and the Docker Compose plugin

# Starting and stopping

Under the hood this is just a docker compose up using the docker-compose.yml in this repository.

We run these docker instances with the current user because 

a) Norsk cannot run as root
b) The files in the current directory are owned by the current user

In production you would have a service user and appropriate permissions for any file/hardware access.

You will first want to build the application and docker container with

```
npm run build
```

Starting the skeleton app

```
./start.sh
```

To stop, it's the same, but with stop.sh

```
./stop.sh 
```

You can see what is currently running with

```
docker ps
```

There should be an instance of Norsk and an instance of the client application running


# Input/Output files

You can write output files to /mnt in the application, and they will end up in the 'mnt' directory outside of the container
Similarly you can read input files from this location too.

# Development loop


Rather than building/starting the whole container setup every time you make a change, you can start only Norsk with

```
./start.sh norsk
```

Then you can rebuild the application with

```
npx tsc
```


And start it with

```
npm run start
```
