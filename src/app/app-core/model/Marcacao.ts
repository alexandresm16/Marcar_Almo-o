export class Marcacao {

  id: number;
  nome: string;
  setor: string;
  dataInclusao: string;
  ramal: string;
  tipo: string

  constructor(id: number, nome: string, setor: string, dataInclusao: string, ramal: string, tipo: string) {
    this.id = id;
    this.nome = nome;
    this.setor = setor;
    this.dataInclusao = dataInclusao;
    this.ramal = ramal;
    this.tipo = tipo;
  }


}
