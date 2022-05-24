# UI
<i>working student ui
</i>

## Requirements
* [Node.js version >= 16.2.0](https://nodejs.org/en/)
* [WebStorm IDEA](https://www.jetbrains.com/webstorm/) or similar
* [Docker/Docker Desktop](https://www.docker.com/)

## Installation
* Download or clone the following repository
* Using WebStorm Javascript IDE (or similar IDEA) open or import the project. For Webstorm IDE user ->  select File > Open > […/path/of/ working-student-ui].
* Using the incorporated terminal run npm install to download and install dependencies. It could be possible that the following line must executed if error persists:
 ```
npm install primevue@^3.12.5 --save
npm install primeicons –save
```


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

 
