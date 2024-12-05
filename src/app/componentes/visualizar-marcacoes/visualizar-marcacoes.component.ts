import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarcacaoService} from "../../app-core/servicos/marcacao-service.service";
import {Marcacao} from "../../app-core/model/Marcacao";
import swal from "sweetalert2";

declare var $: any;


@Component({
  selector: 'app-visualizar-marcacoes',
  templateUrl: './visualizar-marcacoes.component.html',
  styleUrls: ['./visualizar-marcacoes.component.css']
})
export class VisualizarMarcacoesComponent implements OnInit {

  i: number = 0;

  marcacoes: Marcacao [] = [];

  formularioMarcacao: FormGroup;

  constructor(private marcacaoService: MarcacaoService,
              private fb: FormBuilder) {

    this.marcacoes = marcacaoService.populartabela();

    this.formularioMarcacao = this.fb.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(5)]],
      setor: ['', [Validators.required, Validators.minLength(8)]],
      ramal: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      dataInclusao: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  addMarcacao() {
    this.marcacaoService.addMarcacao("Marcacao" + this.i);
    this.i++;
  }


  openModal() {
    $('#add-marcacao').modal('show');
  }

  closeModal() {
    $('#add-marcacao').modal('hide');
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
