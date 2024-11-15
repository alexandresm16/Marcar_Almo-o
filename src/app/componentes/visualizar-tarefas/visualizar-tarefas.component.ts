import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/servicos/tarefa-service.service";
import {Tarefa} from "../../app-core/model/Tarefa";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})
export class VisualizarTarefasComponent implements OnInit {

  i: number =0;

  tarefas: Tarefa [] = [];

  formularioTarefa: FormGroup;




  constructor(private tarefaService: TarefaService,
              private fb: FormBuilder) {

    this.tarefas= tarefaService.populartabela();

    this.formularioTarefa = this.fb.group({
      tituloTarefa: ['', Validators.required],
      dataInicioTarefa: ['', Validators.required],
      dataConclusaoTarefa: ['', Validators.required],
      statusTarefa: ['', Validators.required],
      descricaoTarefa: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  addTarefa(){
    this.tarefaService.addTarefa("TAREFA " + this.i);
    this.i ++;
  }


  openModal(){
    $('#add-tarefa').modal('show');
  }

  closeModal(){
    $('#add-tarefa').modal('hide');
  }

  salvarTarefa(){
    console.log('DADOS DA TAREFA NOVA: ', this.formularioTarefa.value);

  }

  protected readonly Tarefa = Tarefa;
}
