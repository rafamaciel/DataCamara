# Documentação Técnica: `proposicoes-*.csv`

## Descrição Geral

Este arquivo CSV contém dados sobre proposições legislativas apresentadas na Câmara dos Deputados do Brasil entre os anos de 1934 a 2025. Cada linha representa uma proposição individual com suas informações principais, como tipo, número, ano, ementa, status de tramitação e outros metadados associados.

---

## Estrutura das Colunas

| Coluna                             | Tipo    | Descrição                                              |
| ---------------------------------- | ------- | ------------------------------------------------------ |
| `id`                               | Inteiro | Identificador único da proposição.                     |
| `uri`                              | Texto   | Link para a API da proposição na Câmara dos Deputados. |
| `siglaTipo`                        | Texto   | Sigla do tipo da proposição (ex.: PL, MPV, MSC).       |
| `numero`                           | Inteiro | Número sequencial da proposição no ano.                |
| `ano`                              | Inteiro | Ano de apresentação da proposição (2025).              |
| `codTipo`                          | Inteiro | Código interno do tipo de proposição.                  |
| `descricaoTipo`                    | Texto   | Descrição do tipo de proposição.                       |
| `ementa`                           | Texto   | Resumo da proposição.                                  |
| `ementaDetalhada`                  | Texto   | Ementa detalhada (quando disponível).                  |
| `keywords`                         | Texto   | Palavras-chave associadas à proposição.                |
| `ultimoStatus_siglaOrgao`          | Texto   | Sigla do órgão responsável pela última movimentação.   |
| `ultimoStatus_uriOrgao`            | Texto   | URI do órgão responsável pela última movimentação.     |
| `ultimoStatus_regime`              | Texto   | Regime de tramitação (ex.: urgência).                  |
| `ultimoStatus_descricaoTramitacao` | Texto   | Descrição da última tramitação da proposição.          |
| `ultimoStatus_idTipoTramitacao`    | Inteiro | Código da última tramitação.                           |
| `ultimoStatus_descricaoSituacao`   | Texto   | Situação atual da proposição.                          |
| `ultimoStatus_idSituacao`          | Inteiro | Código da situação atual.                              |
| `ultimoStatus_despacho`            | Texto   | Despacho mais recente referente à proposição.          |
| `ultimoStatus_apreciacao`          | Texto   | Forma de apreciação (Plenário, conclusiva, etc.).      |
| `ultimoStatus_url`                 | Texto   | URL da página da proposição no site da Câmara.         |

---

## Observações

* Algumas colunas podem conter valores nulos (`NaN`) quando os dados não estão disponíveis.
* A estrutura dos dados está sujeita a mudanças conforme atualizações nos sistemas da Câmara.
* Recomenda-se uso de tratamento de dados ausentes e normalização para análise.

