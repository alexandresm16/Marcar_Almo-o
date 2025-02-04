import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Importando o HttpClient

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto_semestre_2';


  constructor(private http: HttpClient) {}

  // Exemplo de função que faz uma requisição HTTP
  getData() {
    this.http.get('http://localhost:3000/dados')
      .subscribe(data => {
        console.log(data);
      });
  }
}
