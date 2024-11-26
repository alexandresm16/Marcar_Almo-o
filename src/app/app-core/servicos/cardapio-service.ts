import {Cardapio} from "../model/Cardapio";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  private cardapioSemana: Cardapio [] = [];

  private cardapios: string [] = [];

  addCardapio(marcacao: string){
    this.cardapios.push(marcacao);
    console.log("CARDAPIO ADICIONADO",
      this.cardapios);
  }

  populartabela(): Cardapio[] {

    let c1: Cardapio = new Cardapio(
      0,
      'Segunda-Feira',
      'Arroz e Lentilha',
      'Bife',
      'Batata',
      'Salada de Tomate'
    );

    let c2: Cardapio = new Cardapio(
      0,
      'Terça-Feira',
      'Arroz e Feijão',
      'Frango Assado',
      'Molho',
      'Salada de Alface'
    );

    let c3: Cardapio = new Cardapio(
      0,
      'Quarta-Feira',
      'Arroz e Feijão',
      'Peixe',
      'Moranga',
      'Salada de Repolho'
    );

    let c4: Cardapio = new Cardapio(
      0,
      'Quinta-Feira',
      'Arroz e lentilha',
      'bife',
      'Pure de batatas',
      'Salada de tomate'
    );

    let c5: Cardapio = new Cardapio(
      0,
      'Sexta-Feira',
      'Arroz e Feijão',
      'bife',
      'Batata Doce',
      'Salada de Legumes'
    );

    let c6: Cardapio = new Cardapio(
      0,
      'Sabado',
      'Arroz e Feijão',
      'Frango frito',
      'Batata assada',
      'Salada de tomate'
    );

    let c7: Cardapio = new Cardapio(
      0,
      'Domingo',
      'Arroz e Feijão',
      'Churrasco',
      'Pão de alho',
      'Salada de tomate'
    );

    this.cardapioSemana.push(c1, c2, c3, c4, c5, c6, c7);
    return this.cardapioSemana;
  }
}
