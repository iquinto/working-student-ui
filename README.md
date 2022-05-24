# UI
<i>working student ui
</i>

## Requirements
* [Node.js version >= 16.2.0](https://nodejs.org/en/)
* [WebStorm IDEA](https://www.jetbrains.com/webstorm/) or similar
* [Docker/Docker Desktop](https://www.docker.com/)

## Installation
* Download or clone the following repository



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

 
