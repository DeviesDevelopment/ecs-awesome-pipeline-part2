#!/bin/sh

sed -i "s/green/${COLOR}/g" /var/www/html/index.html

/root/run_apache.sh
