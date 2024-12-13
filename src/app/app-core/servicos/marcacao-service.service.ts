import {Injectable} from '@angular/core';
import {Marcacao} from '../model/Marcacao';
import Dexie from "dexie";
import {jsPDF} from "jspdf";
import "jspdf-autotable";

@Injectable({
  providedIn: 'root'
})

export class MarcacaoService extends Dexie {
  private marcacaoTeste: Marcacao[] = [];

  private dataHora: Date = new Date();


  private marcacoes: string[] = [];

  marcacaoDB: Dexie.Table<Marcacao, number>;

  constructor() {
    super('MarcacaoDB');
    this.version(1).stores({
      marcacoes: '++id, nome, setor, dataInclusao, ramal, tipo',
    });

    this.marcacaoDB = this.table('marcacoes');

  }


  async adicionarMarcacao(marcacao: Marcacao): Promise<number> {
    return await this.marcacaoDB.add(marcacao);
  }

  async buscarMarcacao(): Promise<Marcacao[]> {
    return await this.marcacaoDB.toArray();
  }

  async buscarMarcacaoDiaCorrente(): Promise<Marcacao[]> {
    // Obter a data de hoje no formato 'yyyy-MM-dd' considerando o fuso horário local
    const hoje = new Date();

    // Ajustar para o horário local
    const dataHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()).toISOString().slice(0, 10); // Formato 'yyyy-MM-dd'

    // Buscar todas as marcações com LIKE no formato 'yyyy-MM-dd%'
    const marcacoes = await this.marcacaoDB
      .where('dataInclusao')
      .startsWith(dataHoje)  // Busca todas as marcações com a data de hoje
      .toArray();

    return marcacoes;
  }

  async removerMarcacao(id: number): Promise<void> {
    return await this.marcacaoDB.delete(id);
  }

  async atualizarMarcacao(id: number, marcacao: Marcacao): Promise<number> {
    return await this.marcacaoDB.update(id, marcacao);
  }

  converterData(dataISO: string): string {
    const [date, time] = dataISO.split('T');
    const [year, month, day] = date.split('-');
    const formattedTime = time.length === 5 ? `${time}:00` : time;
    return `${day}/${month}/${year}, ${formattedTime}`;
  }

  async exportarParaPDF(marcacoes: Marcacao[]): Promise<void> {
    const doc: any = new jsPDF();


    // Gerando o PDF com a tabela
    doc.autoTable({
      head: [['Nome', 'Setor', 'Data Inclusão', 'Ramal', 'Tipo']],
      body: marcacoes.map(marcacao => [
        marcacao.nome,
        marcacao.setor,
        this.converterData(marcacao.dataInclusao),
        marcacao.ramal,
        marcacao.tipo
      ]),
    });

    // Salvando o arquivo PDF
    doc.save("marcacoes.pdf");
  }

}



