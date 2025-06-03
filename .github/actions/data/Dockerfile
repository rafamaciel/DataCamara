FROM alpine:3.18 AS base

RUN apk add --no-cache \
    aws-cli \
    python3 \
    py3-pip \
    unzip \
    curl \
    yq

ENV RAW          raw
ENV STANDADIZAED standardized

COPY entrypoint.sh /usr/local/bin/entrypoint

RUN pip install pandas pyarrow requests

RUN chmod +x /usr/local/bin/entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint"]

RUN mkdir /data
WORKDIR /data

FROM base

COPY src/ /usr/src/pipelines/data
