#!/bin/bash
echo "Waiting for Wordpress..."
sleep 10

# Starting Nginx
echo "NGINX Starting"
nginx -g "daemon off;"
