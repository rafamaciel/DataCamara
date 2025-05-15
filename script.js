
var id = "2499748-9";
var dataInicio = "2025-01-01";
const renderers = $.extend(
  $.pivotUtilities.renderers,
  $.pivotUtilities.gchart_renderers
);

const links = {
  votacoes: {
    url: `https://dadosabertos.camara.leg.br/api/v2/votacoes?dataInicio=${dataInicio}&ordem=DESC&ordenarPor=dataHoraRegistro`,
    prefix: 'Ver Votação',
    colunas: {
      uri: 'Ver Votação',
      data: 'Data',
      dataHoraRegistro: 'Hora Registro',
      siglaOrgao: 'Sigla Orgão',
      uriOrgao: 'Ver Orgão',
      uriEvento: 'Ver Evento',
      proposicaoObjeto: 'Proposição',
      uriProposicaoObjeto: 'Ver Proposição',
      descricao: 'Decisão',
      aprovacao: 'Aprovado'
    }
  },
  votos: {
    url: `https://dadosabertos.camara.leg.br/api/v2/votacoes/${id}/votos`,
    prefix: 'Ver Deputado',
    colunas: {
      tipoVoto: 'Tipo de Voto',
      dataRegistroVoto: 'Data de Registro do Voto',
      deputado__nome: 'Deputado',
      deputado__urlFoto: 'Foto Deputado',
      deputado_siglaPartido: 'Sigla Partido',
      deputado_uriPartido: 'Ver Partido',
      deputado_siglaUf: 'Sigla UF',
      deputado_email: 'Eail'
    }
  }
};

function carregarPivotDinamico(link) {
  $("#tabela").html("");
  fetch(link.url, { headers: { 'Accept': 'application/json' } })
    .then(res => res.json())
    .then(json => {
      const dadosBrutos = json.dados;

      if (!Array.isArray(dadosBrutos) || dadosBrutos.length === 0) {
        $("#tabela").html("Nenhum dado retornado.");
        return;
      }

      const dadosNormalizados = formatarDados(dadosBrutos, link)

      
      // 🔍 Verificar colunas detectadas (debug opcional)
      //console.log("Colunas detectadas:", Object.keys(dadosNormalizados[0]));
      console.log("Renderers disponíveis:", Object.keys(renderers));

      // Gera Pivot Table automaticamente
      $("#tabela").pivotUI(dadosNormalizados, {
        renderer: renderers["Table"],
        rendererOptions: {
            c3: {
                data: {
                    colors: {
                        Liberal: '#dc3912', Conservative: '#3366cc', NDP: '#ff9900',
                        Green: '#109618', 'Bloc Quebecois': '#990099'
                    }
                }
            }
        }
    });
    })
    .catch(err => {
      console.error("Erro ao buscar ou processar dados:", err);
      $("#tabela").html("Erro ao carregar os dados.");
    });
}

function planificarObjeto(obj) {
  const result = {};
  const stack = [{ prefix: '', value: obj }];

  while (stack.length > 0) {
    const { prefix, value } = stack.pop();

    for (const key in value) {
      if (!value.hasOwnProperty(key)) continue;

      var val = value[key];
      let newKey = key;
      //if(key == 'uri') newKey = `${key}${prefixo}` 


      if (
        val !== null &&
        typeof val === 'object' &&
        !Array.isArray(val)
      ) {
        // Se for objeto (não array), empilha para processar depois
        stack.push({ prefix: newKey, value: val });
      } else if (typeof val !== 'object' && val !== undefined) {
        // Apenas valores primitivos são adicionadosif(val == 1) val = "SIM"
        if(val == 1) 
          val = "SIM"
        else if ( val == 0) 
          val = "NÃO"
        result[newKey] = val;
      }
    }
  }

  return result;
}

function formatarDados(dadosBrutos, link){
  var dados = dadosBrutos.map(voto => {
    const flat = planificarObjeto(voto);
  
    // Formatar campos com "data" ou "dataHora"
    Object.keys(flat).forEach(chave => {
      const valor = flat[chave];
      if (
        typeof valor === "string" &&
        chave.toLowerCase().includes("data")
      ) {
        const match = valor.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/);
        if (match) {
          const [, ano, mes, dia, hora = "00", min = "00"] = match;
          if (match[4]) {
            flat[chave] = `${dia}/${mes}/${ano} ${hora}:${min}`;
          } else {
            flat[chave] = `${dia}/${mes}/${ano}`;
          }
        }
      }
    });
  
    var chavesUri = Object.keys(flat).filter(chave => chave.startsWith("uri"));
    if (flat.deputado__urlFoto) {
      flat.foto = `<img src="${flat.deputado__nome}" alt="Foto" style="width:40px; height:auto;">`;
      delete(flat.deputado__urlFoto);
    }
  
    chavesUri.forEach(key => {
      if (key == 'uri') {
        flat[link.prefix] = `<button onclick="carregarPivotDinamico(${flat.uri})">${link.prefix}</button>`;
      } else {
        flat[key] = `<button onclick="carregarPivotDinamico(${flat[key]})">Acessar</button>`;
      }
      //delete(flat[key]);
    });
  
    return flat;
  });

  const nomesColunas = link.colunas || {};
  return dados.map(item => {
    const novoItem = {};
    Object.keys(item).forEach(chave => {
      const nomeExibicao = nomesColunas[chave] || chave;
      novoItem[nomeExibicao] = item[chave];
    });
    return novoItem;
  });

}


function main(){
  carregarPivotDinamico(links.votacoes);
  //carregarPivotDinamico(links.votos);
}


main()