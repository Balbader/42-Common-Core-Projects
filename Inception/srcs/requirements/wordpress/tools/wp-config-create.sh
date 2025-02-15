#!/bin/bash

# set MySQL host to "mariadb"
MYSQL_HOST=mariadb

# set MySQL database name to "wordpress"
MYSQL_DATABASE=wordpress

# set the mariadb host to "mariadb" unless it's already set
MARIADB_HOST=${MARIADB_HOST:-mariadb}

# gets the IP address of the MariaDB host using `getent` and `awk`
MARIADB_IP=$(getent hosts $MARIADB_HOST | awk '{ print $1 }')

# appends the IP address and hostname of MariaDB to the host file
echo "$MARIADB_IP $MARIADB_HOST" >> /etc/hosts

# redirects standard error to standard output
exec 2>&1

# defines a lock file path
lock_file="/var/www/html/.setup_complete"

# checks if the lock_file exists. if not, it proceeds with the WordPress setup
if [ ! -f $lock_file ]; then
    cd /var/www/html # go to the wordpress dir
    wp core download --allow-root # download WP core files
    rm -f /var/www/html/wp-config.php # removes any config files
    wp config create --dbname=$MYSQL_DATABASE --dbhost=$MYSQL_HOST --dbuser=$MYSQL_USER --dbpass=$MYSQL_PASSWORD --allow-root --skip-check # generates a "wp-config.php"

	# wait until the MySQL db is accessible
    until wp db check --path=/var/www/html --quiet --allow-root; do
        echo "Waiting for MySQL..."
        sleep 1
    done

	# install WordPress
    wp core install --url="baalbade.42.fr" --title="Inception" --admin_user=$WP_ADMIN_USER --admin_password=$WP_ADMIN_PASSWORD --admin_email=$WP_ADMIN_EMAIL --allow-root

	# create subscriber
    wp user create $WP_SUBSCRIBER_USER $WP_SUBSCRIBER_EMAIL --role=subscriber --user_pass=$WP_SUBSCRIBER_PASSWORD --allow-root

	# install and activate twentyseventeen theme
    wp theme install twentyseventeen --activate --allow-root

	# deletes existing posts
    wp post delete $(wp post list --format=ids --allow-root) --allow-root

	# creates a new post
    wp post create --post_type=post --post_title="This is a post" --post_content="... and its content :)" --post_status=publish --allow-root

	# create a lock file to indicate the setup is completed
    echo "WordPress setup completed."
    touch $lock_file
else
    echo "WordPress setup has already been run, skipping..."
fi

# Starts PHP-FPM to serve PHP files
exec /usr/sbin/php-fpm7.4 -F
