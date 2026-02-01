build comands

first build react and be sure there is error
npm run build

build for docker

docker build -t map-front .


extract image as .tar file

docker save -o map-front.tar map-front

send tar file to server

scp .\map-front.tar ubuntu@216.250.12.42:/home/ubuntu/map-front

in server terimanal

sudo docker stop <container id >

sudo docker rm <container id>

sudo docker rmi <image id>

sudo docker load -i tar_file.tar

sudo docker run -d -p 5173:80 map-front




cards in dahsbaord ygtyarlykday bozulmalar