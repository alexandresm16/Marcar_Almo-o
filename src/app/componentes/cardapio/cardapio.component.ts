import {Component, OnInit} from '@angular/core';
import {Cardapio} from "../../app-core/model/Cardapio";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardapioService} from "../../app-core/servicos/cardapio-service";

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

    this.cardapioSemana = cardapioService.populartabela();

    this.formularioCardapio = this.fb.group({
      id: ['', Validators.required],
      dia: ['', Validators.required],
      cardoidrato: ['-', Validators.required],
      proteina: ['-',],
      complemento: ['-', ],
      salada: ['-', Validators.required]
    });

  }

  ngOnInit(): void {
  }


  addCardapio(){
    this.cardapioService.addCardapio("Cardapio" + this.i);
    this.i ++;
  }

  salvarCardapio(){
    console.log('DADOS DO NOVO CARDAPIO: ', this.formularioCardapio.value);

  }


  openModal(){
    $('#edit-cardapio').modal('show');
  }

  closeModal(){
    $('#edit-cardapio').modal('hide');
  }

  protected readonly Cardapio = Cardapio;

}
