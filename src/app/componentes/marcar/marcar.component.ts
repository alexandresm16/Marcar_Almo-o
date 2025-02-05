import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarcacaoService} from "../../app-core/servicos/marcacao-service.service";
import {Marcacao} from "../../app-core/model/Marcacao";

import swal from "sweetalert2";

@Component({
  selector: 'app-marcar',
  templateUrl: './marcar.component.html',
  styleUrls: ['./marcar.component.css']
})
export class MarcarComponent implements OnInit {


  private dataBrasileira: string = (() => {
    let dataHora: Date = new Date();
    const options = {timeZone: "America/Sao_Paulo", hour12: false};
    const dataBrasil = dataHora.toLocaleString("sv-SE", options); // "sv-SE" retorna no formato ISO
    const [date, time] = dataBrasil.split(" ");
    return `${date}T${time.slice(0, 5)}`; // Formato final: yyyy-MM-ddTHH:mm
  })();

  private dataHora: Date = new Date();
  private data = this.dataBrasileira
  private horaLimiteString: string = '09:30:00';

  public formularioAberto: boolean = this.verificarHorario();

  verificarHorario(): boolean {
    const agora = new Date();
    const horaLimiteArray = this.horaLimiteString.split(':');
    const horaLimiteDate = new Date();
    horaLimiteDate.setHours(Number(horaLimiteArray[0]), Number(horaLimiteArray[1]), 0, 0); // 09:30:00

    // Verifica se o horário atual é anterior ao horário limite
    console.log("horario limite" + horaLimiteDate);
    return agora < horaLimiteDate;
  }


  i: number = 0;

  formularioMarcacao: FormGroup;

  private fb: FormBuilder;

  constructor(private marcacaoService: MarcacaoService,
              fb: FormBuilder) {
    this.fb = fb;


    this.formularioMarcacao = this.fb.group({
      id: [0],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      setor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      ramal: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5)]],
      data: [''],
      tipo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.formularioAberto) {
      console.log("Dentro do horário");
      console.log(this.dataHora);
    } else {
      console.log("passou do horário");
      console.log(this.dataHora);
    }
  }


  salvarMarcacao() {
    if (this.formularioMarcacao.valid) {
      if (this.formularioAberto) {
        const novaMarcacao = new Marcacao(
          this.formularioMarcacao.value.nome,
          this.formularioMarcacao.value.setor,
          this.data.toString(),
          this.formularioMarcacao.value.ramal,
          this.formularioMarcacao.value.tipo,
          undefined
        );

        this.marcacaoService.adicionarMarcacao(novaMarcacao).subscribe(
          (resposta) => {
            swal.fire('sucesso', 'Agendamento realizado com sucesso!', 'success');
            this.formularioMarcacao.reset();
          },
          (erro) => {
            swal.fire('Erro', 'Não foi possivel realizar o agendamento.', 'error');
          }
        );

      } else {
        swal.fire('Alerta', 'Não foi possivel realizar o agendamento pois já passou do horario!', 'warning');
      }

    } else {
      console.log("CAMPOS INVALIDOS ENCONTRADOS");
      this.marcarTodosComoClicados();
      swal.fire('Cuidado', 'Alguns campos estão invalidos', 'warning');
    }
  }

  isCampovalido(inputNome: string): boolean {
    const campo: any = this.formularioMarcacao.get(inputNome);
    return campo && campo.touched && campo.invalid;
  }

  marcarTodosComoClicados() {
    this.formularioMarcacao.markAllAsTouched();
  }


  protected readonly Marcacao = Marcacao;


}
