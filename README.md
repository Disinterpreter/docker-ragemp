# docker-ragemp
Run RAGE Multiplayer in a Docker container. 

Build
`docker build -t ragemp`


Run
`docker run -d -v /ragemp:/ragemp -p 22005:22005/udp ragemp`


Get from a pull
`docker pull disinterpreter/docker-ragemp`


Run from a pull
`docker run --rm -v /ragemp:/ragemp -p 22005:22005/udp disinterpreter/docker-ragemp`
