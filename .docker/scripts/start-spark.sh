#!/bin/bash
set -e

echo "Iniciando Spark Thrift Server..."

PARQUET_DIR="/opt/spark/parquet"
WAREHOUSE_DIR="/opt/spark/warehouse"

mkdir -p "$WAREHOUSE_DIR"

# Exibe os arquivos Parquet montados
echo "Arquivos .parquet disponíveis:"
ls -l "$PARQUET_DIR"

# Inicia o Thrift Server
/opt/bitnami/spark/sbin/start-thriftserver.sh \
  --master local[*] \
  --hiveconf spark.sql.warehouse.dir=$WAREHOUSE_DIR \
  --conf spark.sql.catalogImplementation=in-memory

# Mantém o container vivo
tail -f /opt/bitnami/spark/logs/spark--org.apache.spark.sql.hive.thriftserver.HiveThriftServer2-1-*.out
