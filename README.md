# UI
<i>working student ui
</i>

## Requirements
Node.js v16.2.0
* [Node.js version >= 16.2.0]([https://spring.io/projects/spring-boot](https://nodejs.org/en/)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Vue](https://vuejs.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)

## Installation



## Docker build 
```
docker build -t workingstudentui .
```

## Docker push to  hub 
```
docker tag workingstudentui iquinto/workingstudentui
```

```
docker push iquinto/workingstudentui
```

## Docker build 
```
docker run -it -p 8080:80 --rm --name workingstudentui workingstudentui
```


## Docker stop
```
docker stop $(docker ps -a -q)
docker rm -vf $(docker ps -a -q)
docker rmi -f $(docker images -a -q) 

```

 
