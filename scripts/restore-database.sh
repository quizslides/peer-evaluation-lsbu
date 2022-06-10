DATABASE_NAME=$1

docker exec -i db-peer-evaluation psql -U user -d db -c "DROP database db;"
docker exec -i db-peer-evaluation psql -U user -d db -c "DROP SCHEMA public CASCADE;"
docker exec -i db-peer-evaluation psql -U user -d db -c "CREATE SCHEMA public;"

cat $DATABASE_NAME | docker exec -i db-peer-evaluation psql -U user -d db
