import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarcacaoService} from "../../app-core/servicos/marcacao-service.service";
import {Marcacao} from "../../app-core/model/Marcacao";

declare var $: any;


@Component({
  selector: 'app-visualizar-marcacoes',
  templateUrl: './visualizar-marcacoes.component.html',
  styleUrls: ['./visualizar-marcacoes.component.css']
})
export class VisualizarMarcacoesComponent implements OnInit {

  i: number =0;

  marcacoes: Marcacao [] = [];

  formularioMarcacao: FormGroup;

  constructor(private marcacaoService: MarcacaoService,
              private fb: FormBuilder) {

    this.marcacoes= marcacaoService.populartabela();

    this.formularioMarcacao = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required, Validators.minLength(5)],
      setor: ['', Validators.required, Validators.minLength(8)],
      ramal: ['', Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      tipo: ['', Validators.required],
      dataInclusao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  addMarcacao(){
    this.marcacaoService.addMarcacao("Marcacao" + this.i);
    this.i ++;
  }


  openModal(){
    $('#add-marcacao').modal('show');
  }

  closeModal(){
    $('#add-marcacao').modal('hide');
  }

  salvarMarcacao(){
    console.log('DADOS DA NOVA MARCACAO: ', this.formularioMarcacao.value);

  }

  protected readonly Marcacao = Marcacao;

}
