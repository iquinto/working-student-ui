# working-student-client
working-student-client

# Docker 
-- RUN \

docker build -t working-student-client . \
docker run -it -p 8080:80 --rm --name working-student working-student-client
\
-- STOP \
 \
docker stop $(docker ps -a -q) \
docker rm -vf $(docker ps -a -q)  \
docker rmi -f $(docker images -a -q)  