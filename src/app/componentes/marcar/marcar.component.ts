import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarcacaoService} from "../../app-core/servicos/marcacao-service.service";
import {Marcacao} from "../../app-core/model/Marcacao";

import swal from "sweetalert2";

@Component({
  selector: 'app-marcar',
  templateUrl: './marcar.component.html',
  styleUrls: ['./marcar.component.css']
})
export class MarcarComponent implements OnInit {
  private dataHora: Date = new Date();



  i: number = 0;

  marcacoes: Marcacao [] = [];

  formularioMarcacao: FormGroup;

  private fb: FormBuilder;

  constructor(private marcacaoService: MarcacaoService,
              fb: FormBuilder) {
    this.fb = fb;


    this.formularioMarcacao = this.fb.group({
      id: [0],
      nome: ['', [Validators.required, Validators.minLength(5)]],
      setor: ['', [Validators.required, Validators.minLength(8)]],
      ramal: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      dataInclusao: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  salvarMarcacao() {
    if (this.formularioMarcacao.valid) {
      console.log("DADOS SALVOS COM SUCESSO: ",
        this.formularioMarcacao.value);

      let deuCerto = true;
      if (deuCerto) {
        swal.fire('sucesso', 'Agendamento realizado com sucesso', 'success');
        this.formularioMarcacao.reset();
      } else {
        swal.fire('Erro', 'Não foi possivel realizar o agendamento', 'error');
      }

    } else {
      console.log("CAMPOS INVALIDOS ENCONTRADOS");
      this.marcarTodosComoClicados();
      swal.fire('Cuidado', 'Alguns campos estão invalidos', 'warning');
    }

  }

  isCampovalido(inputNome: string): boolean {
    const campo: any = this.formularioMarcacao.get(inputNome);
    return campo && campo.touched && campo.invalid;
  }

  marcarTodosComoClicados() {
    this.formularioMarcacao.markAllAsTouched();
  }

  protected readonly Marcacao = Marcacao;


}
