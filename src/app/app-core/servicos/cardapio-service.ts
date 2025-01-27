import {Cardapio} from "../model/Cardapio";
import {Injectable} from "@angular/core";
import Dexie from "dexie";

@Injectable({
  providedIn: 'root'
})
export class CardapioService extends Dexie {

  private cardapioSemana: Cardapio [] = [];

  private cardapios: string [] = [];

  cardapioDB: Dexie.Table<Cardapio, number>;

  constructor() {
    super('cardapioDB');
    this.version(1).stores({
      cardapios: '++id, dia, carboidrato, proteina, complemento, salada',
    });

    this.cardapioDB = this.table('cardapios');
  }

  async adicionarCardapio(cardapio: Cardapio): Promise<number> {
    return await this.cardapioDB.add(cardapio);
  }

  async atualizarCardapio(id: number, cardapio: Cardapio): Promise<number> {
    return await this.cardapioDB.update(id, cardapio);
  }

  async buscarCardapio(): Promise<Cardapio[]> {
    this.populartabela();
    return await this.cardapioDB.toArray();
  }


  populartabela() {

    let c1: Cardapio = new Cardapio(
      0,
      'Segunda-Feira',
      'Arroz e Lentilha',
      'Bife',
      'Batata',
      'Salada de Tomate'
    );

    let c2: Cardapio = new Cardapio(
      1,
      'Terça-Feira',
      'Arroz e Feijão',
      'Frango Assado',
      'Molho',
      'Salada de Alface'
    );

    let c3: Cardapio = new Cardapio(
      2,
      'Quarta-Feira',
      'Arroz e Feijão',
      'Peixe',
      'Moranga',
      'Salada de Repolho'
    );

    let c4: Cardapio = new Cardapio(
      3,
      'Quinta-Feira',
      'Arroz e lentilha',
      'bife',
      'Pure de batatas',
      'Salada de tomate'
    );

    let c5: Cardapio = new Cardapio(
      4,
      'Sexta-Feira',
      'Arroz e Feijão',
      'bife',
      'Batata Doce',
      'Salada de Legumes'
    );

    let c6: Cardapio = new Cardapio(
      5,
      'Sabado',
      'Arroz e Feijão',
      'Frango frito',
      'Batata assada',
      'Salada de tomate'
    );

    let c7: Cardapio = new Cardapio(
      6,
      'Domingo',
      'Arroz e Feijão',
      'Churrasco',
      'Pão de alho',
      'Salada de tomate'
    );

    this.adicionarCardapio(c1);
    this.adicionarCardapio(c2);
    this.adicionarCardapio(c3);
    this.adicionarCardapio(c4);
    this.adicionarCardapio(c5);
    this.adicionarCardapio(c6);
    this.adicionarCardapio(c7);

    console.log('CHAMARAM O POPULAR TABELA NO CARDAPIO SERVICE');
  }


}
