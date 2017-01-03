FROM debian:jessie
MAINTAINER Disinterpreter "disinterpreter@protonmail.ch"

ENV RAGEMP 0.1

# both and tcp and udp? check it!
EXPOSE 20005
EXPOSE 22005/udp

# First run  -- install dependency
RUN echo 'deb http://httpredir.debian.org/debian testing main contrib non-free' > /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y -t testing gcc wget && \
    apt-get clean

# Second run -- install app
RUN useradd ragemp && \
    # Mountable volume
    mkdir /ragemp && \
    # Download and extract
    wget -qO- -O /tmp/linsrv64.tar.gz https://rage.mp/dl/linsrv64.tar.gz && \
    tar -zxvf /tmp/linsrv64.tar.gz -C /opt  && \
    rm /tmp/linsrv64.tar.gz && \
    # Set exec flag
    chmod +x /opt/x64/server
    # Set links between master and mountable volume
    ln -s /ragemp/conf.json /opt/x64/conf.json
    # You can add packages, maps, etc in remote volume

# Publish volume
VOLUME /ragemp

ADD start_server.sh /opt

# Maybe directly run server? e.g. "/ragemp/x64/server"
ENTRYPOINT ["/opt/start_server.sh"]
