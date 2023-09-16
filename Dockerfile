FROM debian:bookworm-slim

EXPOSE 20005
EXPOSE 22005/udp

RUN apt update && apt install -y wget liblocal-lib-perl libjson-perl libatomic1 procps && \
    apt clean autoclean && \
    apt autoremove --yes && \
    rm -rf /var/lib/{apt,dpkg,cache,log}/

WORKDIR /ragemp

RUN wget https://cdn.rage.mp/updater/prerelease/server-files/linux_x64.tar.gz && \
    tar -xvf ./linux_x64.tar.gz && \
    rm -rf ./linux_x64.tar.gz

WORKDIR /ragemp/ragemp-srv


ADD start_server.sh /ragemp/ragemp-srv
ADD config-generator.pl /ragemp/

ENTRYPOINT ["./start_server.sh"]
