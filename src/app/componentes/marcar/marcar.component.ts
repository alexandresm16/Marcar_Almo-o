import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarcacaoService} from "../../app-core/servicos/marcacao-service.service";
import {Marcacao} from "../../app-core/model/Marcacao";

@Component({
  selector: 'app-marcar',
  templateUrl: './marcar.component.html',
  styleUrls: ['./marcar.component.css']
})
export class MarcarComponent implements OnInit {


  i: number =0;

  marcacoes: Marcacao [] = [];

  formularioMarcacao: FormGroup;

  constructor(private marcacaoService: MarcacaoService,
              private fb: FormBuilder) {

    this.marcacoes= marcacaoService.populartabela();

    this.formularioMarcacao = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      setor: ['', Validators.required],
      ramal: ['', Validators.required],
      dataInclusao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  addMarcacao(){
    this.marcacaoService.addMarcacao("Marcacao" + this.i);
    this.i ++;
  }

  salvarMarcacao(){
    console.log('DADOS DA NOVA MARCACAO: ', this.formularioMarcacao.value);

  }

  protected readonly Marcacao = Marcacao;


}
