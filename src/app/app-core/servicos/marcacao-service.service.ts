import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marcacao } from '../model/Marcacao';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root',
})
export class MarcacaoService {
  private apiUrl = 'http://192.168.1.24:3000/marcacao'; // URL da API no backend (ajuste se necessário)

  constructor(private http: HttpClient) {}

  // Adicionar uma nova marcação
  adicionarMarcacao(marcacao: Marcacao): Observable<Marcacao> {
    return this.http.post<Marcacao>(this.apiUrl, marcacao);
  }

  // Buscar todas as marcações
  buscarMarcacao(): Observable<Marcacao[]> {
    return this.http.get<Marcacao[]>(this.apiUrl);
  }

  // Buscar marcações do dia corrente
  buscarMarcacaoDiaCorrente(): Observable<Marcacao[]> {
    const dataHoje = new Date().toISOString().slice(0, 10); // Formato 'yyyy-MM-dd'

    return this.http.get<Marcacao[]>(`${this.apiUrl}/dia/${dataHoje}`);
  }

  // Remover uma marcação
  removerMarcacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Atualizar uma marcação
  atualizarMarcacao(id: number, marcacao: Marcacao): Observable<Marcacao> {
    return this.http.put<Marcacao>(`${this.apiUrl}/${id}`, marcacao);
  }

  // Converter data para o formato 'dd/MM/yyyy, HH:mm'
  converterData(dataISO: string): string {
    if (!dataISO) {
      console.error('Data ISO inválida recebida:', dataISO);
      return ''; // Retorna uma string vazia em caso de erro
    }

    try {
      // Separa a data e a hora
      const [date, time] = dataISO.split('T');

      // Separa o ano, mês e dia
      const [year, month, day] = date.split('-');

      // Verifica se a hora é válida e formata os segundos, se necessário
      const formattedTime = time.length === 5 ? `${time}:00` : time;

      // Retorna o formato 'DD/MM/YYYY, HH:mm:ss'
      return `${day}/${month}/${year}, ${formattedTime}`;
    } catch (error) {
      console.error('Erro ao converter a data:', error);
      return ''; // Retorna uma string vazia em caso de erro
    }
  }

  // Exportar marcações para PDF
  exportarParaPDF(): void {
    // Chama o serviço para obter as marcações do servidor
    this.buscarMarcacaoDiaCorrente().subscribe(
      (marcacoes: Marcacao[]) => {
        // Quando as marcações são obtidas com sucesso, gera o PDF
        const doc: any = new jsPDF();

        // Gerar o PDF com a tabela
        doc.autoTable({
          head: [['Nome', 'Setor', 'Data Inclusão', 'Ramal', 'Tipo']],
          body: marcacoes.map(marcacao => [
            marcacao.nome,
            marcacao.setor,
            this.converterData(marcacao.data),
            marcacao.ramal,
            marcacao.tipo,
          ]),
        });

        // Salvar o arquivo PDF
        doc.save('marcacoes.pdf');
      },
      (erro) => {
        console.error('Erro ao buscar as marcações:', erro); // Log de erro
        swal.fire('Erro', 'Não foi possível obter as marcações para exportação.', 'error');
      }
    );
  }

}
