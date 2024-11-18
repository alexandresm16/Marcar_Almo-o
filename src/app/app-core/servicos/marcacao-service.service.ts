import { Injectable } from '@angular/core';
import { Marcacao } from '../model/Marcacao';


@Injectable({
  providedIn: 'root'
})

export class MarcacaoService {
  private marcacaoTeste: Marcacao[] = [];


  private marcacoes: string[] = [];
  constructor() { }

  addMarcacao(marcacao: string){
    this.marcacoes.push(marcacao);
    console.log("TAREFAS ADICIONADAS",
      this.marcacoes);
  }

  populartabela(): Marcacao[] {
    let m: Marcacao = new Marcacao(
      0,
      'Alexandre',
      'T.I',
      '01/11/2024',
      '222'
    );

    let m2: Marcacao = new Marcacao(
      0,
      'Giuliano',
      'T.I',
      '02/11/2024',
      '222'
    );

    let m3: Marcacao = new Marcacao(
      0,
      'Lucas',
      'Ouvidoria',
      '03/11/2024',
      '239'
    );

    this.marcacaoTeste.push(m, m2, m3);
    return this.marcacaoTeste;
  }
}


