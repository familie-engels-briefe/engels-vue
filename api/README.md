# API and static file server

This repository serves as the api to get the xml letters from the database and as a static file server for the facsimiles.

## Setup

* Copy the sample configuration file `.env.example` to `.env` and change where necessary
* `dockerc-compose exec api php artisan migrate` to migrate the database
* To create an admin user run `docker-compose exec api php artisan users:create your@email.com`
* To load the xml files and facsimiles into exist 5 setup the test sync (see below) and run `docker-compose exec api php artisan exist:sync`

## Testing

You have to run the tests in your docker container: `docker-compose exec api vendor/bin/phpunit -c phpunit.xml`

### Test sync

To test the sync command you can create a ssh tunnel to the production database via: `ssh engels -L 172.17.0.1:8082:127.0.0.1:8080` where `engels` is the host/port of the engels server, `172.17.0.1` is the ip of the `docker0` network. Inside docker the production server is now reachable at `172.17.0.1:8082`.

# IDE helper

To create helper files for better ide autocompletion:

```bash
docker-compose exec api php artisan ide-helper:generate
docker-compose exec api php artisan ide-helper:models
docker-compose exec api php artisan ide-helper:meta
```
