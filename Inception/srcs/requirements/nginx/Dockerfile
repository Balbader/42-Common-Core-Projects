FROM debian:bullseye

# install NGINX + dependencies
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y nginx
RUN apt-get install -y vim
RUN apt-get install -y curl
RUN apt-get install -y openssl

# SSL generation
# 1. create a directory to store certificates and keys
# 2. generate the keys
RUN mkdir -p /etc/nginx/
RUN mkdir -p /etc/nginx/ssl
RUN openssl req -x509 -nodes -out /etc/nginx/ssl/baalbade.42.fr.crt -keyout /etc/nginx/ssl/baalbade.42.fr.key -subj "/C=FR/ST=IDF/L=Paris/O=42/OU=42/CN=baalbade.42.fr/UID=baalbade"

# set working directory
WORKDIR /etc/nginx

# copy the provided config file to the container
COPY ./conf/nginx.conf /etc/nginx
RUN chown -R www-data:www-data /var/www/html

# expose poty 443 for HTTPS traffic
EXPOSE 443

# copy entrypoint script
COPY ./tools/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# set entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
