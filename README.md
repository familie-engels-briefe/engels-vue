## Structure

The application is structured into three components. For more information about the components, visit the corresponding directory. All components are connected and run by docker.

### API

The [api](api) caches and serves the xml data and facsimile pdfs. The frontend never talks to a database directly.

### Wordpress

[Wordpress](wordpress) serves the content for the pages, e.g. imprint, privacy policy, about page, etc.

### Frontend

The [frontend](frontend) is a vue single-page-application (spa) which displays the content from the api and wordpress.

## Setup

* Copy the `docker-compose.override.example.yml` file to `docker-compose.override.yml` and adjust the settings. 
* Create your local nginx config files in `docker/nginx/conf.d/` (reference: https://github.com/familie-engels-briefe/webapp/wiki/nginx-Config). 
* Now you can start every container via `docker-compose up`.

## Contact

For technical questions: [Tim Helfensdörfer](https://github.com/thelfensdrfer)

For questions about the content: [Fabian Etling](https://github.com/FabianEtling)
