import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private static usuarios = [
    { usuario: 'adminadmin', senha: 'adminadmin' },
    { usuario: 'usuario1', senha: 'senha123' },
    { usuario: 'usuario2', senha: 'senha456' }
  ];

  constructor() {
  }


  static logar(formGroup: FormGroup): boolean {
    // Pegando os valores do formulário
    const usuario = formGroup.get('usuario')?.value;
    const senha = formGroup.get('password')?.value;

    // Verificando se as credenciais fornecidas existem na lista de usuários
    const usuarioValido = this.usuarios.find(
      (user) => user.usuario === usuario && user.senha === senha
    );

    if (usuarioValido) {
      return true; // Se as credenciais estiverem corretas
    } else {
      return false; // Se não encontrar as credenciais na lista
    }
  }

  static sair() {
    return false;
  }

}
