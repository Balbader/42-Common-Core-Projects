FROM debian:bullseye

# Install MariaDB server and client
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install mariadb-server -y
RUN apt-get install mariadb-client -y
RUN apt-get install -y procps
RUN rm -rf /var/lib/apt/lists/*

# Give permissions on specific folders
RUN mkdir -p /var/run/mysqld
RUN chown -R mysql:mysql /var/run/mysqld
RUN chmod 777 /var/run/mysqld

# Set the working directory inside the container
RUN mkdir -p /etc/mysql
WORKDIR /etc/mysql/

# Copy the MariaDB configuration
COPY ./conf/my.cnf /etc/mysql/my.cnf

# Copy the init DB script
COPY /tools/create_db.sh /etc/mysql/

# Grant execute permissions to the init DB script
RUN chmod +x /etc/mysql/create_db.sh

# Expose the default MariaDB port
EXPOSE 3306

# Start the MariaDB server on container startup
ENTRYPOINT [ "/etc/mysql/create_db.sh" ]
