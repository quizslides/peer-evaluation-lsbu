DATE=$(date +%Y-%m-%d-%T)

docker exec -i db-peer-evaluation pg_dump --username user --no-owner db > ./peer-evaluation-local-$DATE.sql
