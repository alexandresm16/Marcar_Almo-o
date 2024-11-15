export class Tarefa {

  id: number;
  titulo: string;
  datainicio: string;
  dataconclusao: string;
  status: string;
  descricao: string;

  constructor(id: number, titulo: string, datainicio: string, dataconclusao: string, status: string, descricao: string) {
    this.id = id;
    this.titulo = titulo;
    this.datainicio = datainicio;
    this.dataconclusao = dataconclusao;
    this.status = status;
    this.descricao = descricao;
  }

}
