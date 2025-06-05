# Documentação Técnica: `deputados.csv`

## Descrição Geral

Este arquivo CSV contém informações sobre os deputados federais da Câmara dos Deputados do Brasil, incluindo dados pessoais, mandatos legislativos e perfis públicos. Cada linha representa um deputado.

---

## Estrutura das Colunas

| Coluna                 | Tipo    | Descrição                                                                         |
| ---------------------- | ------- | --------------------------------------------------------------------------------- |
| `uri`                  | Texto   | Link para a API pública do deputado.                                              |
| `nome`                 | Texto   | Nome parlamentar do deputado.                                                     |
| `idLegislaturaInicial` | Inteiro | Legislatura em que o deputado iniciou o mandato atual.                            |
| `idLegislaturaFinal`   | Inteiro | Legislatura em que termina ou terminou o mandato.                                 |
| `nomeCivil`            | Texto   | Nome civil completo do deputado.                                                  |
| `cpf`                  | Texto   | CPF do deputado (geralmente omitido ou anonimizado).                              |
| `siglaSexo`            | Texto   | Sexo do deputado (`M` para masculino, `F` para feminino).                         |
| `urlRedeSocial`        | Texto   | Lista separada por vírgulas com URLs de redes sociais (Twitter, Instagram, etc.). |
| `urlWebsite`           | Texto   | URL de website pessoal ou institucional.                                          |
| `dataNascimento`       | Data    | Data de nascimento no formato `AAAA-MM-DD`.                                       |
| `dataFalecimento`      | Data    | Data de falecimento (se aplicável).                                               |
| `ufNascimento`         | Texto   | Unidade federativa (estado) de nascimento.                                        |
| `municipioNascimento`  | Texto   | Município de nascimento.                                                          |

---

## Observações

* A maioria dos campos de CPF está vazia por razões de privacidade.
* Os campos de redes sociais contêm múltiplos links separados por vírgulas.
* As colunas `dataFalecimento`, `urlWebsite` e `urlRedeSocial` podem estar ausentes para deputados em exercício sem presença digital pública.
* As legislaturas seguem a numeração oficial da Câmara dos Deputados, sendo a 57ª a vigente em 2025.
