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

  private dataBrasileira: string = (() => {
    let dataHora: Date = new Date();
    const options = {timeZone: "America/Sao_Paulo", hour12: false};
    const dataBrasil = dataHora.toLocaleString("sv-SE", options); // "sv-SE" retorna no formato ISO
    const [date, time] = dataBrasil.split(" ");
    return `${date}T${time.slice(0, 5)}`; // Formato final: yyyy-MM-ddTHH:mm
  })();

  private data = this.dataBrasileira

  marcacoes: Marcacao [] = [];

  formularioMarcacao: FormGroup;

  constructor(private marcacaoService: MarcacaoService,
              private fb: FormBuilder) {

    this.marcacaoService.buscarMarcacaoDiaCorrente().subscribe(marcacoes => this.marcacoes = marcacoes);

    this.formularioMarcacao = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      setor: ['', [Validators.required, Validators.maxLength(20)]],
      ramal: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      data: [''],
      tipo: ['', Validators.required],
      id: [0]
    });
  }

  ngOnInit(): void {
    this.listarMarcacoesHoje();
    console.log(this.dataBrasileira)
  }

  listarMarcacoes() {
    this.marcacaoService.buscarMarcacao().subscribe(marcacoes => this.marcacoes = marcacoes);
  }


  listarMarcacoesHoje() {
    this.marcacaoService.buscarMarcacaoDiaCorrente().subscribe(marcacoes => this.marcacoes = marcacoes);
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
      // Criando o objeto novaMarcacao com base nos dados do formulário
      const novaMarcacao = new Marcacao(
        this.formularioMarcacao.value.nome,
        this.formularioMarcacao.value.setor,
        this.data,
        this.formularioMarcacao.value.ramal,
        this.formularioMarcacao.value.tipo,
        undefined
      );

      // Chamada ao serviço para salvar a nova marcação
      this.marcacaoService.adicionarMarcacao(novaMarcacao).subscribe(
        (resposta) => {
          if (resposta) {
            // Sucesso ao salvar a marcação
            swal.fire('Sucesso', 'Agendamento realizado com sucesso', 'success');
            this.formularioMarcacao.reset(); // Resetando o formulário
            this.listarMarcacoesHoje(); // Atualizando a lista de marcações
          }
        },
        (error) => {
          // Tratamento de erro
          swal.fire('Erro', 'Não foi possível realizar o agendamento', 'error');
          console.error('Erro ao salvar marcação:', error);
        }
      );
    } else {
      // Quando o formulário é inválido
      console.log("CAMPOS INVALIDOS ENCONTRADOS");
      this.marcarTodosComoClicados(); // Marcar campos como clicados
      swal.fire('Cuidado', 'Alguns campos estão inválidos', 'warning');
    }
  }




  isCampovalido(inputNome: string): boolean {
    const campo: any = this.formularioMarcacao.get(inputNome);
    return campo && campo.touched && campo.invalid;
  }

  marcarTodosComoClicados() {
    this.formularioMarcacao.markAllAsTouched();
  }



  submitform() {
    if (this.formularioMarcacao.value.id > 0) {
      this.editarFormMarcacao()
    } else {
      this.salvarMarcacao();
    }
  }




  excluirTarefa(id: number) {
  swal.fire({
    title: 'Tem certeza que deseja excluir?',
    text: 'Você não poderá reverter essa decisão!',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonColor: '#3085d6',
  }).then((value) => {
    if (value.isConfirmed) {
      this.marcacaoService.removerMarcacao(id).subscribe(
        () => {
          // Sucesso na exclusão
          swal.fire('Excluído!', 'A marcação foi excluída com sucesso.', 'success');
          this.listarMarcacoesHoje(); // Atualiza a lista de marcações após a exclusão
        },
        (erro) => {
          // Erro ao tentar excluir
          swal.fire('Erro', 'Não foi possível excluir a marcação. Tente novamente.', 'error');
          console.error('Erro ao remover marcação:', erro); // Log de erro para depuração
        }
      );
    }
  });
}


  carregarDadosMarcacao(editarMarcacao: Marcacao) {
    this.formularioMarcacao.patchValue({
      nome: editarMarcacao.nome,
      setor: editarMarcacao.setor,
      data: editarMarcacao.data,
      ramal: editarMarcacao.ramal,
      tipo: editarMarcacao.tipo,
      id: editarMarcacao.id
    });
    this.openModal();
  }


  editarFormMarcacao() {
    if (this.formularioMarcacao.valid) {
      const editarMarcacao: Marcacao = new Marcacao(
        this.formularioMarcacao.value.nome,
        this.formularioMarcacao.value.setor,
        this.formularioMarcacao.value.data,  // Certifique-se de que o campo 'dataInclusao' seja tratado corretamente
        this.formularioMarcacao.value.ramal,
        this.formularioMarcacao.value.tipo,
        this.formularioMarcacao.value.id
      );

      // Atualizando a marcação
      this.marcacaoService.atualizarMarcacao(this.formularioMarcacao.value.id, editarMarcacao)
        .subscribe(
          (resposta) => {
            if (resposta) { // Verifique a resposta
              swal.fire('Sucesso!', 'Agendamento editado com sucesso.', 'success');
              this.formularioMarcacao.reset();  // Resetando o formulário
              this.closeModal();  // Fechando o modal
              this.listarMarcacoesHoje();  // Atualizando a lista de marcações
            } else {
              swal.fire('Atenção', 'Nenhum agendamento encontrado, ou nenhuma atualização necessária.', 'info');
            }
          },
          (error) => {
            // Tratamento de erro
            swal.fire('Erro', 'Houve um erro ao editar o agendamento. Tente novamente.', 'error');
            console.error('Erro ao editar agendamento:', error); // Log de erro para debug
          }
        );
    } else {
      // Caso o formulário não seja válido
      swal.fire('Atenção', 'Por favor, preencha todos os campos corretamente.', 'warning');
    }
  }


  exportarPdf() {
    this.marcacaoService.exportarParaPDF();
  }

  exportarExcel() {
    this.marcacaoService.exportarParaExcel();
  }


  protected readonly marcacao = Marcacao;

}
