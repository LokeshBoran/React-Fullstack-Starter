FROM buildpack-deps:jessie

ENV HOME /React-FullStarter-Kit

WORKDIR ${HOME}
ADD . $HOME

ENV NODE 8
ENV PATH $HOME/.yarn/bin:$PATH

RUN \
  curl -sL https://deb.nodesource.com/setup_$NODE.x | bash - && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  apt-get update && \
  apt-get install -y nodejs

RUN rm -rf /var/lib/apt/lists/*

RUN yarn

EXPOSE 8000
