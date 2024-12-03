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

  private fb: FormBuilder;

  constructor(private marcacaoService: MarcacaoService,
              fb: FormBuilder) {
    this.fb = fb;

    this.marcacoes= marcacaoService.populartabela();

    this.formularioMarcacao = this.fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required, Validators.minLength(5)],
      setor: ['', Validators.required, Validators.minLength(8)],
      ramal: ['', Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      dataInclusao: ['',Validators.required],
      tipo: ['',Validators.required]
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
