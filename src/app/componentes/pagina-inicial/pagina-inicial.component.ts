import { Component, OnInit } from '@angular/core';
import {Cardapio} from "../../app-core/model/Cardapio";
import {CardapioService} from "../../app-core/servicos/cardapio-service";

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  cardapioSemana: Cardapio [] = [];

  constructor(private cardapioService: CardapioService) {
  }

  ngOnInit(): void {
    this.listarCardapios();
    console.log("Cardapio inicial");
  }

  listarCardapios(){
    this.cardapioService.buscarCardapio().then(resposta => this.cardapioSemana = resposta);
  }

}
