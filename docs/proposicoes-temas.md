# Documentação Técnica: `proposicoesTemas-*.csv`

## Descrição Geral

Este arquivo CSV contém a associação entre proposições legislativas apresentadas entre 1946 e 2025 na Câmara dos Deputados e seus respectivos temas. Cada linha representa uma combinação entre uma proposição e um tema classificado.

---

## Estrutura das Colunas

| Coluna          | Tipo    | Descrição                                                                            |
| --------------- | ------- | ------------------------------------------------------------------------------------ |
| `uriProposicao` | Texto   | URI da proposição na API da Câmara dos Deputados.                                    |
| `siglaTipo`     | Texto   | Sigla do tipo de proposição (ex.: `PL`, `PEC`, `MPV`).                               |
| `numero`        | Inteiro | Número da proposição no ano.                                                         |
| `ano`           | Inteiro | Ano de apresentação da proposição (2024).                                            |
| `codTema`       | Inteiro | Código numérico do tema associado à proposição.                                      |
| `tema`          | Texto   | Nome do tema associado à proposição (ex.: "Saúde", "Economia").                      |
| `relevancia`    | Inteiro | Índice de relevância atribuído ao tema dentro da proposição (geralmente `0` ou `1`). |

---

## Observações

* Uma mesma proposição pode estar associada a múltiplos temas (linhas repetidas com o mesmo `numero`, `ano` e `siglaTipo`).
* O campo `relevancia` geralmente possui valor `0`; valores diferentes indicam temas considerados mais centrais para a proposição.
* Pode ser cruzado com outros arquivos de proposições via os campos `siglaTipo`, `numero` e `ano`.

