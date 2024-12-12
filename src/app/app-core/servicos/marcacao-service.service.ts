import { Injectable } from '@angular/core';
import { Marcacao } from '../model/Marcacao';
import Dexie from "dexie";

@Injectable({
  providedIn: 'root'
})

export class MarcacaoService extends Dexie {
  private marcacaoTeste: Marcacao[] = [];

  private dataHora: Date = new Date();


  private marcacoes: string[] = [];

  marcacaoDB: Dexie.Table<Marcacao, number>;

  constructor() {
    super('MarcacaoDB');
    this.version(1).stores({
      marcacoes: '++id, nome, setor, dataInclusao, ramal, tipo',
    });

    this.marcacaoDB = this.table('marcacoes');

  }


  async adicionarMarcacao(marcacao: Marcacao): Promise<number> {
    return await this.marcacaoDB.add(marcacao);
  }

  async buscarMarcacao(): Promise<Marcacao[]> {
    return await this.marcacaoDB.toArray();
  }

  async removerMarcacao(id: number): Promise<void>{
    return await this.marcacaoDB.delete(id);
  }

  async atualizarMarcacao(id: number, marcacao: Marcacao): Promise<number> {
    return await this.marcacaoDB.update(id, marcacao);
  }

}



