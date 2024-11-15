import { Injectable } from '@angular/core';
import {Tarefa} from "../model/Tarefa";

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private tarefasTeste: Tarefa[] = [];


  private tarefas: string[] = [];
  constructor() { }

  addTarefa(tarefa: string){
    this.tarefas.push(tarefa);
    console.log("TAREFAS ADICIONADAS",
      this.tarefas);
  }

  populartabela(): Tarefa[] {
    let t: Tarefa = new Tarefa(
      0,
      'Estudar Angular',
      '01/11/2024',
      '07/11/2024',
      'NOVA',
      'Estudar o framework Angular'
    );

    let t2: Tarefa = new Tarefa(
      0,
      'Estudar Bootstrap',
      '01/11/2024',
      '07/11/2024',
      'EM_ANDAMENTO',
      'Estudar o framework bootstrap'
    );

    let t3: Tarefa = new Tarefa(
      0,
      'Popular tabelas',
      '01/11/2024',
      '07/11/2024',
      'CONCLUIDA',
      'Popular as linhas de uma tabela'
    );

    this.tarefasTeste.push(t, t2, t3);
    return this.tarefasTeste;
  }
}


