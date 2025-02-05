import {Component, OnInit} from '@angular/core';
import {Cardapio} from "../../app-core/model/Cardapio";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardapioService} from "../../app-core/servicos/cardapio-service";
import swal from "sweetalert2";

declare var $: any;

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  i: number = 0;

  cardapioSemana: Cardapio [] = [];

  formularioCardapio: FormGroup;

  constructor(private cardapioService: CardapioService,
              private fb: FormBuilder) {

    this.formularioCardapio = this.fb.group({
      id: ['', Validators.required],
      dia: ['', Validators.required],
      carboidrato: ['-', Validators.required],
      proteina: ['-',],
      complemento: ['-', ],
      salada: ['-', Validators.required]
    });

  }

  ngOnInit(): void {
    this.listarCardapios();
  }

  listarCardapios(){
    this.cardapioService.buscarCardapios().subscribe(
      (resposta) => {
        this.cardapioSemana = resposta;
        this.cardapioSemana.sort((a, b) => a.id - b.id);
      },
      (erro) => {
        console.error('Erro ao buscar cardápios', erro);
      }
    );
  }

  salvarCardapio(){
    console.log('DADOS DO NOVO CARDAPIO: ', this.formularioCardapio.value);
  }

  carregarDadosCardapio(editarCardapio: Cardapio){
    this.formularioCardapio.patchValue({
      carboidrato: editarCardapio.carboidrato,
      proteina: editarCardapio.proteina,
      complemento: editarCardapio.complemento,
      salada: editarCardapio.salada,
      dia: editarCardapio.dia,
      id: editarCardapio.id
    });
    this.openModal();
  }


editarFormCardapio() {
  const editarCardapio: Cardapio = new Cardapio(
    this.formularioCardapio.value.id,
    this.formularioCardapio.value.dia,
    this.formularioCardapio.value.carboidrato,
    this.formularioCardapio.value.proteina,
    this.formularioCardapio.value.complemento,
    this.formularioCardapio.value.salada
  );

  this.cardapioService.atualizarCardapio(this.formularioCardapio.value.id, editarCardapio)
    .subscribe(
      (resposta) => {
        if (resposta) {
          swal.fire('Sucesso!', 'Cardápio editado com sucesso.', 'success');
          this.formularioCardapio.reset();
          this.closeModal();
          this.listarCardapios();
        } else {
          swal.fire('Atenção', 'Nenhum cardápio encontrado, ou nenhuma atualização necessária.', 'info');
        }
      },
      (error) => {
        // Caso ocorra algum erro na requisição
        swal.fire('Erro', 'Ocorreu um erro ao atualizar o cardápio. Tente novamente.', 'error');
      }
    );
}


  openModal(){
    $('#edit-cardapio').modal('show');
  }

  closeModal(){
    $('#edit-cardapio').modal('hide');
    this.formularioCardapio.reset();
  }

  protected readonly Cardapio = Cardapio;

}
