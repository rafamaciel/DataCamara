FROM bitnami/spark:3.5

USER root

COPY scripts/start-spark.sh /opt/spark/start.sh
RUN chmod +x /opt/spark/start.sh

EXPOSE 10000 10001 4040

ENTRYPOINT ["/opt/spark/start.sh"]
