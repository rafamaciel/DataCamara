#!/bin/sh

set -e

[ -n "${DEFAULT_BASE_URL:-}" ] || DEFAULT_BASE_URL="http://dadosabertos.camara.leg.br"
[ -n "${DEFAULT_ENDPOINT:-}" ] || DEFAULT_ENDPOINT="arquivos"
[ -n "${AWS_PROFILE:-}" ]      || export AWS_PROFILE="backblaze"
[ -n "${ENDPOINT_URL:-}" ]     || export ENDPOINT_URL="https://s3.${AWS_REGION}.backblazeb2.com"

export API_BASE_URL="${DEFAULT_BASE_URL}/${DEFAULT_ENDPOINT}"
export UNTIL="2025"

check_var() {
  var_name="$1"
  eval "val=\$$var_name"
  if [ -z "$val" ]; then
    echo "Erro: variável '$var_name' não definida." >&2
    exit 1
  fi
}

setup_aws_cli(){
  aws configure set aws_access_key_id     "$AWS_ACCESS_KEY_ID"     --profile "$AWS_PROFILE"
  aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY" --profile "$AWS_PROFILE"
  aws configure set region "$AWS_REGION" --profile "$AWS_PROFILE"
  aws configure set output "json" --profile "$AWS_PROFILE"
}

extract(){
    local target=$1
    local raw=$2
    python /usr/src/pipelines/data/download_file.py "$target" "$raw"
}
run(){
  check_var "AWS_ACCESS_KEY_ID"
  check_var "AWS_SECRET_ACCESS_KEY"
  check_var "AWS_REGION"
  check_var "REFERENCE"
  check_var "TARGET"

  setup_aws_cli

  local raw="/data/raw/$REFERENCE"
  local standardized="/data/standardized/$REFERENCE"
  
  if [ -n "${SINCE:-}" ]; then
    for CURRENT_YEAR in $(seq "$SINCE" "$UNTIL"); do
      
      local current="${TARGET//\{YEAR\}/$CURRENT_YEAR}"
      local target="${API_BASE_URL}/$current"

      echo "Processando: $target"
      extract "$target" "$raw"
    done
    python /usr/src/pipelines/data/convert_to_parquet.py "$raw" "$standardized"
  else
    local target="${API_BASE_URL}/$TARGET"
    echo "Processando: $target"
    extract "$target" "$raw"
     python /usr/src/pipelines/data/convert_to_parquet.py "$raw" "$standardized"
  fi

}

run