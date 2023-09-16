# docker-ragemp
A docker container for RAGE Multiplayer

## History
It is the first docker container implementation for RAGE MP, first commit if this repo is 11 dec of 2016.

But after the time I've got new experience with working on containerization and Docker, and I decided to upgrade this repo and add new features.

## Features
- Updated version of the OS and the code
- Added auto generation of config file (`conf.json`)
- Upgraded docker compose


## Usage

For the first launch, you should make your settings via ENV
These ENV have tag `RAGE_`.
Examples:
```yaml
RAGE_MAXPLAYERS: "100"
RAGE_NAME: "RAGE:MP Unofficial docker server [docker]"
RAGE_GAMEMODE: "freeroam"
RAGE_STREAM_DISTANCE: "300.0"
RAGE_ANNOUNCE: '1'
RAGE_CSHARP: "disabled"
RAGE_BIND: '0.0.0.0'
RAGE_PORT: '22005'
```
Pay your attention with `RAGE_STREAM_DISTANCE` it will be converted to `stream-distance` and use `1/0` for `boolean` values like in `RAGE_ANNOUNCE`

For the building you should use the default command

```
docker build -t ragemp-server:latest .
```

For the running without `docker-compose` use 
```
docker run -e RAGE_BIND=0.0.0.0 .... -p 22005:22005/udp ragemp-server:latest
```


Pull from a container registry
```
docker pull disinterpreter/ragemp-server:latest
```