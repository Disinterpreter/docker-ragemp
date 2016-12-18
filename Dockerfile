FROM debian:jessie
MAINTAINER Disinterpreter "disinterpreter@protonmail.ch"

ENV RAGEMP 0.1

RUN useradd ragemp

EXPOSE 20005
EXPOSE 22005/udp

#RUN mkdir /server

RUN echo 'deb http://httpredir.debian.org/debian testing main contrib non-free' > /etc/apt/sources.list
RUN apt-get update \
    && apt-get install -y -t testing gcc wget

RUN cd ~/ && wget http://46.226.165.173/ragemp.tar.gz
RUN cd ~/ && tar -xvf ./ragemp.tar.gz
RUN cd ~/ && ln -s server /ragemp
ADD start_server.sh ~/
RUN chmod -R 777 ~/server 
ENTRYPOINT ["~/start_server.sh"]
CMD [""]

VOLUME /root/server
