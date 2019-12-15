#!/bin/bash

HEUTE=`date +"%Y_%m_%d"`

# Folgende Variablen setzen:
WIKI_PATH=''
DATA_PATH=''
BACKUP_PATH='/´backup'
MYSQL_HOST='localhost'
DB_NAME='mydb'
MYSQL_USER='root'

cd ${BACKUP_PATH}
mkdir ${HEUTE}

# Backup der Dateien der Wiki und von SuiteCRM
tar -czf ${HEUTE}/wiki.tar.gz ${WIKI_PATH}/data/pages ${WIKI_PATH}/data/meta ${WIKI_PATH}/data/media ${WIKI_PATH}/data/media_meta ${WIKI_PATH}/data/attic ${WIKI_PATH}/data/media_attic ${WIKI_PATH}/conf
tar -czf ${HEUTE}/data.tar.gz ${DATA_PATH}

# Backup der SuiteCRM Datenbank
mysqldump -h ${MYSQL_HOST} -u ${MYSQL_USER} ${DB_NAME} | gzip > ${BACKUP_PATH}/${HEUTE}/data_db.sql.gz

# Lösche Verzeichnisse der Backups die älter als  90 Tage sind.
DELDATE=`date +"%Y_%m_%d" --date="90 days ago"`
if [ -d ${DELDATE} ]; then
      rm -rf ${DELDATE}
fi


