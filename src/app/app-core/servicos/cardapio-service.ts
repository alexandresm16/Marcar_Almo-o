import {Cardapio} from "../model/Cardapio";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  private apiUrl = 'http://192.168.1.205:3000/cardapio';  // URL do seu backend

  constructor(private http: HttpClient) {}

  // Adiciona um cardápio no backend
  adicionarCardapio(cardapio: Cardapio): Observable<Cardapio> {
    return this.http.post<Cardapio>(this.apiUrl, cardapio);
  }

  // Atualiza um cardápio no backend
  atualizarCardapio(id: number, cardapio: Cardapio): Observable<Cardapio> {
    return this.http.put<Cardapio>(`${this.apiUrl}/${id}`, cardapio);
  }

  // Busca todos os cardápios no backend
  buscarCardapios(): Observable<Cardapio[]> {
    return this.http.get<Cardapio[]>(this.apiUrl);
  }

  // Busca um cardápio específico pelo ID
  buscarCardapioPorId(id: number): Observable<Cardapio> {
    return this.http.get<Cardapio>(`${this.apiUrl}/${id}`);
  }
}
