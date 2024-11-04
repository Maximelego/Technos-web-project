#!/bin/bash

echo "[STATUS] - Removing environnment files..."

rm -r ./app/node_modules
rm ./.env
rm ./init_db.sql

echo "[STATUS] - Done cleaning !"
