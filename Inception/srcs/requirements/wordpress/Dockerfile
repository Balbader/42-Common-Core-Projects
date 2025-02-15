FROM debian:bullseye

# Update the package repository and install wordpress
RUN apt-get update
RUN apt-get install -y wget
RUN apt-get install -y curl php7.4 php7.4-fpm php7.4-mysql mariadb-client php7.4-gd
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp-cli.phar
RUN mv wp-cli.phar /usr/local/bin/wp

# Expose port 9000 for php traffic
EXPOSE 9000

# Copy the Wordpress configuration
RUN mkdir -p /run/php
RUN mkdir -p /var/www/html/
COPY ./conf/wwww.conf /etc/php/7.4/fpm/pool.d/www.conf

# Copy entrypoint script
COPY tools/wp-config-create.sh /wp-config-create.sh
RUN chmod +x /wp-config-create.sh

# Set entrypoint
ENTRYPOINT ["/wp-config-create.sh"]
