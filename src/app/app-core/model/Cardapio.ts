export class Cardapio {

  id: number;
  dia: string;
  carboidrato: string;
  proteina: string;
  complemento: string;
  salada: string;

  constructor(id: number, dia: string, carboidrato: string, proteina: string,
              complemento: string, salada: string) {

    this.id = id;
    this.dia = dia;
    this.carboidrato = carboidrato;
    this.proteina = proteina;
    this.complemento = complemento;
    this.salada = salada;

  }
}
