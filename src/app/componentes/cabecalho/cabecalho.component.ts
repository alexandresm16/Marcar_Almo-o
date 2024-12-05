import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import swal from "sweetalert2";

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

  ngOnInit(): void {
  }


  openModal() {
    $('#login').modal('show');
  }

  closeModal() {
    $('#login').modal('hide');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login: ', this.loginForm.value);
    }
  }

  login(){
    if (this.loginForm.valid) {
      this.logado=true;
      this.closeModal();
    }else {
      swal.fire('Cuidado', 'Login ou senha invalidos', 'warning');
    }

  }

  sair(){
    this.logado=false;
  }


}
