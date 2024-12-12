export class Marcacao {

  id?: number;
  nome: string;
  setor: string;
  dataInclusao: string;
  ramal: string;
  tipo: string

  constructor(nome: string, setor: string, dataInclusao: string, ramal: string, tipo: string, id?: number) {
    this.id = id;
    this.nome = nome;
    this.setor = setor;
    this.dataInclusao = dataInclusao;
    this.ramal = ramal;
    this.tipo = tipo;
  }


}
