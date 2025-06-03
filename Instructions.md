
## Como utilizar
1. Construa a imagem de ETL ( `docker compose build etl` )
2. Construa a imagem do warehouse ( `docker compose build warehouse` )
3. Configure seu ambiente (`cp .env.example data.env`)
4. Extraia os dados desejados
`REFERENCE="proposicoes" TARGET="proposicoes/csv/proposicoes-{YEAR}.csv" SINCE="2020" docker compose --profile etl up etl`
5. Suba a stack de observabilidade e configure o warehouse (`docker compose up`)

conexao com o warehouse:
host: warehouse
port: 10000
user: admin
pass: admin
