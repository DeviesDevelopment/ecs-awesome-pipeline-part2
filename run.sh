#!/bin/sh

sed -i "s/###COLOR/${COLOR}/g" /var/www/html/index.html

/root/run_apache.sh
