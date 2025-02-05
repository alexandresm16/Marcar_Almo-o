import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginServiceService} from "../../app-core/servicos/login-service.service";
import Swal from "sweetalert2";

declare var $: any;

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  logado: boolean = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      // Chamando o método do serviço de login para verificar as credenciais
      this.logado = LoginServiceService.logar(this.loginForm);

      if (this.logado) {
        this.closeModal();
      } else {
        // Se não logado, exibe a mensagem de erro
        Swal.fire('Cuidado', 'Login ou senha inválidos', 'warning');
      }
    } else {
      // Se o formulário for inválido, exibe a mensagem de erro
      Swal.fire('Cuidado', 'Por favor, preencha todos os campos corretamente.', 'warning');
    }
  }

  sair() {
    this.logado = false;
  }

  ngOnInit(): void {
  }


  openModal() {
    $('#login').modal('show');
  }

  closeModal() {
    $('#login').modal('hide');
  }


}
