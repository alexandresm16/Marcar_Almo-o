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

    this.cardapioSemana = cardapioService.populartabela();
  }

  ngOnInit(): void {
  }

}
