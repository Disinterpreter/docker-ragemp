FROM debian:jessie
MAINTAINER Disinterpreter "disinterpreter@protonmail.ch"

ENV RAGEMP 0.1

RUN useradd ragemp
VOLUME /server

EXPOSE 20005
EXPOSE 22005/udp

#RUN mkdir /server

RUN echo 'deb http://httpredir.debian.org/debian testing main contrib non-free' > /etc/apt/sources.list
RUN apt-get update \
    && apt-get install -y -t testing gcc

ADD server /server

WORKDIR /server
ENTRYPOINT ["./start_server.sh"]
CMD [""]
