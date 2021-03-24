import fs from "fs";

const estados = JSON.parse(fs.readFileSync("Estados.json"));
const cidades = JSON.parse(fs.readFileSync("Cidades.json"));
let cidadesDeCadaEstado = [];
let estadosComQtdCidades = [];

GerarArquivosJsonEstado();
estadosComQtdCidades = MapeiaArrayEstadosQtdCidades();
getEstadosComMenosCidades();
getEstadosComMaisCidades();
MaiorNomeCadaEstado();
MenorNomeCadaEstado();

function getEstadosComMaisCidades() {
  console.log(
    estadosComQtdCidades
      .sort((a, b) => a.QtdCidades - b.QtdCidades)
      .slice(estadosComQtdCidades.length - 5, estadosComQtdCidades.length)
  );
}

function MaiorNomeCadaEstado() {
  for (let index = 0; index < estados.length; index++) {
    var cidade = obterCidadesEstado(estados[index].ID)
      .sort((a, b) => b.Nome.length - a.Nome.length)
      .sort()
      .slice(0, 1);

    console.log(cidade[0].Nome + " - " + estados[index].Sigla);
  }
}

function MenorNomeCadaEstado() {
  for (let index = 0; index < estados.length; index++) {
    var cidade = obterCidadesEstado(estados[index].ID)
      .sort((a, b) => a.Nome.length - b.Nome.length)
      .sort()
      .slice(0, 1);

    console.log(cidade[0].Nome + " - " + estados[index].Sigla);
  }
}

function getEstadosComMenosCidades() {
  console.log(
    estadosComQtdCidades
      .sort((a, b) => b.QtdCidades - a.QtdCidades)
      .slice(estadosComQtdCidades.length - 5, estadosComQtdCidades.length)
  );
}

function MapeiaArrayEstadosQtdCidades() {
  let estadosComQuantidadeMunicipios = [];
  for (let index = 0; index < estados.length; index++) {
    let qtdCidades = ObtemQuantidadeCidadesPorEstado(estados[index].Sigla);
    estadosComQuantidadeMunicipios.push({
      UF: estados[index].Sigla,
      QtdCidades: qtdCidades,
    });
  }
  return estadosComQuantidadeMunicipios;
}

function GerarArquivosJsonEstado() {
  var idsEstados = estados.map((e) => e.ID);
  for (let index = 0; index < idsEstados.length; index++) {
    cidadesDeCadaEstado = obterCidadesEstado(idsEstados[index]);

    const dadosEstado = estados.find(
      (estado) => estado.ID === idsEstados[index]
    );
    criaArquivoEstados(dadosEstado, cidadesDeCadaEstado);
  }
}

function obterCidadesEstado(estadoId) {
  return cidades.filter((cidade) => cidade.Estado == estadoId);
}

function criaArquivoEstados(dadosEstado, cidadesDoEstado) {
  fs.writeFileSync(
    dadosEstado.Sigla + ".json",
    JSON.stringify(cidadesDoEstado)
  );
}

function ObtemQuantidadeCidadesPorEstado(UF) {
  UF = UF.toLowerCase();
  return JSON.parse(fs.readFileSync(UF + ".json")).length;
}
