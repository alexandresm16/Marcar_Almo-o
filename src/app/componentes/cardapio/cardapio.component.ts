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
    this.cardapioService.buscarCardapio().then(resposta => this.cardapioSemana = resposta);
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

  editarFormCardapio(){
    const editarCardapio: Cardapio = new Cardapio(
      this.formularioCardapio.value.id,
      this.formularioCardapio.value.dia,
      this.formularioCardapio.value.carboidrato,
      this.formularioCardapio.value.proteina,
      this.formularioCardapio.value.complemento,
      this.formularioCardapio.value.salada
    );
    this.cardapioService.atualizarCardapio(this.formularioCardapio.value.id, editarCardapio)
      .then(resposta => {
        if(resposta === 1){
          swal.fire('Sucesso!','Cardapio editado com sucesso.', 'success');
          this.formularioCardapio.reset();
          this.closeModal();
          this.listarCardapios();
        }else {
          swal.fire('Atenção', 'Nenhum cardapio econtrado, ou nenhuma atualização necessária', 'info');
        }
      });

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
