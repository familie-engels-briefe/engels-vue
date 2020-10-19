## Requirements

* docker >= 18
* docker-compose

Clone the php api repository into `../engels-api` or create a symlink. It is mounted into the php docker container.

## Start

```
docker-compose up --build
```

### Errors when starting engels-exist

Sometimes, when creating a new engels-exist container, it will not start with the following error messages:

```
engels-exist | ERROR StatusLogger File not found in file system or classpath: /exist/etc/log4j2.xml
engels-exist | ERROR StatusLogger Reconfiguration failed: No configuration found for '7d4991ad' at 'null' in 'null'
engels-exist | [main] ERROR org.exist.jetty.JettyStart - Unable to find configuration file on classpath!
engels-exist exited with code 0
```

Currently there is no known fix available, except extracting the [configuration file](https://thelfensdrfer.de/downloads/engels_docker_config.zip) into `data/exist` before starting the container. This has only to be done once.

## Stop

`docker-compose stop`

## Development

To run docker-compose locally, create a `docker-compose.override.yml` file with the following contents:

```
version: '3.6'

services:
  exist:
    ports:
      - 8090:8080
      - 8453:8443
  nginx:
    ports:
      - 8000:80
    volumes:
      - ./nginx.local.conf:/etc/nginx/nginx.conf:ro # local nginx config
  mariadb:
    ports:
      - 3306:3306
```

This will override the nginx config, the local config does not use ssl and is much simpler in general.

## Deployment / Access

Add the following lines to your `/etc/hosts` file:

```
127.0.0.1	api.engels-archiv.de
127.0.0.1	wordpress.engels-archiv.de
```

The api is reachable at: http://api.engels-archiv.de/

Wordpress is reachable at: http://wordpress.engels-archiv.de/

ExistDB is reachable at: http://127.0.0.1:8080/

The default username for exist-db is `admin` (no password). To change it run: `docker exec exist java -jar start.jar client -q -u admin -P '' -x 'sm:passwd("admin", "123456")'`

### Oxygen

To connect oxygen to the existdb docker container (locally) you can follow the offical guidelines: https://www.oxygenxml.com/doc/versions/21.1/ug-editor/topics/configure-exist-datasource.html

### Import of initial data

To import initial data into exist:

* Login at `http://127.0.0.1:8080`
	* Username: `admin`
	* Password: `(empty)`
* Start the eXide application from the dashboard
	* Click on `File` -> `Manage`
	* Double click on the `apps` row
	* Click on the `Upload Files` button
		* Click on the bottom `Upload Files` button and select `engels.xar`
		* Click on the `Done` button and check if the directory `engels` is present
