Aqui está a documentação técnica em Markdown para o arquivo `deputadosOcupacoes.csv`:

---

# Documentação Técnica: `deputadosOcupacoes.csv`

## Descrição Geral

Este arquivo CSV contém o histórico de ocupações profissionais anteriores dos deputados federais brasileiros. Cada linha representa uma ocupação diferente associada a um deputado.

---

## Estrutura das Colunas

| Coluna         | Tipo    | Descrição                                                                                               |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `id`           | Inteiro | Identificador único do deputado. Pode ser usado para cruzamento com a base de deputados.                |
| `uri`          | Texto   | URI da API com informações do deputado correspondente.                                                  |
| `titulo`       | Texto   | Cargo ou título da ocupação (ex.: "Gerente Administrativo", "Chefe de Enfermagem").                     |
| `entidade`     | Texto   | Nome da organização ou entidade onde o deputado exerceu a ocupação.                                     |
| `entidadeUF`   | Texto   | Unidade federativa da entidade (ex.: `AC`, `RJ`, `MT`).                                                 |
| `entidadePais` | Texto   | País da entidade (normalmente `BRASIL`).                                                                |
| `anoInicio`    | Texto   | Ano de início da ocupação (formato: `AAAA`).                                                            |
| `anoFim`       | Texto   | Ano de término da ocupação (formato: `AAAA`). Pode estar ausente (`NaN`) se em aberto ou não informado. |

---

## Observações

* Os dados podem conter múltiplas entradas para um mesmo deputado, representando diferentes ocupações ao longo do tempo.
* A coluna `id` permite integração com a base de deputados (`deputados.csv`).
* Anos de início e fim são strings e podem precisar ser convertidos para inteiros para fins de análise temporal.

