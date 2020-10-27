# Content Management System

## Setup

Visit the wordpress url, e.g. wordpress.famile-engels-briefe.de, to install wordpress. Take the database credentials and host from your `docker-compose.override.yml` file. After logging in into wordpress.famile-engels-briefe.de/wp-admin activate the Engels theme to activate some special REST routes for the frontend.

### Plugins

After the install and theme activation you should get a message about the required and/or recommended plugins you can/should install.

#### Recommended

* `wp-sentry-integration`

### Sentry

Insert the following constants in your `wp-config.php` to enable sentry:

```php
define( 'WP_SENTRY_PHP_DSN', 'https://9ba0e15c02cc4cdba911da5acbf8084f@o467780.ingest.sentry.io/5494740' );

define( 'WP_SENTRY_BROWSER_DSN', 'https://9ba0e15c02cc4cdba911da5acbf8084f@o467780.ingest.sentry.io/5494740' );

define( 'WP_SENTRY_ENV', 'local' );
```
