docker build --tag=discogs-api .
docker run -p 8080:8080 discogs-api