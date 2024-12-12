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

  private dataHora: Date = new Date();

  marcacoes: Marcacao [] = [];

  formularioMarcacao: FormGroup;

  constructor(private marcacaoService: MarcacaoService,
              private fb: FormBuilder) {

    this.formularioMarcacao = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(5)]],
      setor: ['', [Validators.required]],
      ramal: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      dataInclusao: [''],
      tipo: ['', Validators.required],
      id: [0]
    });
  }

  ngOnInit(): void {
    this.listarMarcacoes();
  }

  listarMarcacoes(){
    this.marcacaoService.buscarMarcacao().then(resposta => this.marcacoes = resposta);
  }

  openModal() {
    $('#add-marcacao').modal('show');
  }

  closeModal() {
    $('#add-marcacao').modal('hide');
    this.formularioMarcacao.reset();
  }

  salvarMarcacao() {
    if (this.formularioMarcacao.valid) {
      const novaMarcacao = new Marcacao(
        this.formularioMarcacao.value.nome,
        this.formularioMarcacao.value.setor,
        this.dataHora.toString(),
        this.formularioMarcacao.value.ramal,
        this.formularioMarcacao.value.tipo,
        undefined
      );

      this.marcacaoService.adicionarMarcacao(novaMarcacao).then(resposta => {
        if (resposta > 0) {
          swal.fire('sucesso', 'Agendamento realizado com sucesso', 'success');
          this.formularioMarcacao.reset();
          this.listarMarcacoes();
        }
      }).catch(error => {
        swal.fire('Erro', 'Não foi possivel realizar o agendamento', 'error');
      })

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

  submitform(){
    if(this.formularioMarcacao.value.id > 0){
      this.editarFormMarcacao()
      console.log(this.formularioMarcacao.value.id)
    }else {
      this.salvarMarcacao();
    }
  }

  excluirTarefa(id: number){
    swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: 'Você não poderá reverter essa decisão!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
    }).then(value => {
      if(value.isConfirmed){
        this.marcacaoService.removerMarcacao(id).then(resposta => {
          swal.fire('Sucesso', 'Agendamento excluido com sucesso!', 'success');
          this.listarMarcacoes();
        });

  }
    }).catch(error => {
      swal.fire('Erro', 'O agendamento não pode ser excluido', 'error');
    });

  }



  converterData(dataISO: string): string {
    const [date, time] = dataISO.split('T');
    const [year, month, day] = date.split('-');
    const formattedTime = time.length === 5 ? `${time}:00` : time;
    return `${day}/${month}/${year}, ${formattedTime}`;
  }

  carregarDadosMarcacao(editarMarcacao: Marcacao){
    this.formularioMarcacao.patchValue({
      nome: editarMarcacao.nome,
      setor: editarMarcacao.setor,
      dataInclusao: editarMarcacao.dataInclusao,
      ramal: editarMarcacao.ramal,
      tipo: editarMarcacao.tipo,
      id: editarMarcacao.id
    });
    this.openModal();
  }

  editarFormMarcacao(){
    const formattedDate = this.converterData(this.formularioMarcacao.value.dataInclusao.toLocaleString());
    const editarMarcacao: Marcacao = new Marcacao(
      this.formularioMarcacao.value.nome,
      this.formularioMarcacao.value.setor,
      this.formularioMarcacao.value.dataInclusao,
      this.formularioMarcacao.value.ramal,
      this.formularioMarcacao.value.tipo,
      this.formularioMarcacao.value.id
    );
    this.marcacaoService.atualizarMarcacao(this.formularioMarcacao.value.id, editarMarcacao)
      .then(resposta => {
        if(resposta === 1){
          swal.fire('Sucesso!','Agendamento editado com sucesso.', 'success');
          this.formularioMarcacao.reset();
          this.closeModal();
          this.listarMarcacoes();
        }else {
          swal.fire('Atenção', 'Nenhum agendamento econtrado, ou nenhuma atualização necessária', 'info');
        }
      });

  }



  protected readonly Marcacao = Marcacao;

}
