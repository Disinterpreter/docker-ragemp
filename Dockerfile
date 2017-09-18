FROM debian:jessie
MAINTAINER Disinterpreter "disinterpreter@protonmail.ch"

ENV RAGEMP 0.1

# both and tcp and udp? check it!
EXPOSE 20005
EXPOSE 22005/udp
EXPOSE 22006
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
    wget -qO- -O /tmp/server https://cdn.rage.mp/lin/server && \
    mkdir /opt/x64/ && \
    mv /tmp/server /opt/x64/server
    #tar -zxvf /tmp/linsrv64.tar.gz -C /opt  && \
    #rm /tmp/linsrv64.tar.gz
RUN chmod +x /opt/x64/server
    # Set links between master and mountable volume

# Publish volume
VOLUME /ragemp

RUN ln -s /opt/x64/conf.json /ragemp/conf.json
# You can add packages, maps, etc in remote volume


ADD start_server.sh /opt

# Maybe directly run server? e.g. "/ragemp/x64/server"
ENTRYPOINT ["/opt/start_server.sh"]
