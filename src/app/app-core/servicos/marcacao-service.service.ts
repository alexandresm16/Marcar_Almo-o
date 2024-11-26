import { Injectable } from '@angular/core';
import { Marcacao } from '../model/Marcacao';


@Injectable({
  providedIn: 'root'
})

export class MarcacaoService {
  private marcacaoTeste: Marcacao[] = [];

  private dataHora: Date = new Date();


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
      this.dataHora.toLocaleString(),
      '222'
    );

    let m2: Marcacao = new Marcacao(
      0,
      'Lucas',
      'Ouvidoria',
      this.dataHora.toLocaleString(),
      '239'
    );

    let m3: Marcacao = new Marcacao(
      0,
      'Giuliano',
      'T.I',
      this.dataHora.toLocaleString(),
      '222'
    );

    this.marcacaoTeste.push(m, m2, m3);
    return this.marcacaoTeste;
  }
}


