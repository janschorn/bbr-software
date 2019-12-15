#!/bin/bash

HEUTE=`date +"%Y_%m_%d"`

# Folgende Variablen setzen:
WP_PATH='/WORDPRESS'
BACKUP_PATH='/BACKUP'
MYSQL_HOST='SERVER'
DB_NAME='DBNAME'
MYSQL_USER='USERNAME'

cd ${BACKUP_PATH}

# Backup der Dateien der Wiki und von SuiteCRM
tar -czf ${HEUTE}/wp.tar.gz ${WP_PATH}

# Backup der SuiteCRM Datenbank
mysqldump --defaults-file="~/.mywp.cnf" -h ${MYSQL_HOST} -u ${MYSQL_USER} ${DB_NAME} | gzip > ${BACKUP_PATH}/${HEUTE}/wp_db.sql.gz

# Lösche Verzeichnisse der Backups die älter als  90 Tage sind.
DELDATE=`date +"%Y_%m_%d" --date="90 days ago"`
if [ -d ${DELDATE} ]; then
      rm -rf ${DELDATE}
fi
 
