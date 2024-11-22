import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaginaInicialComponent} from "./componentes/pagina-inicial/pagina-inicial.component";
import {VisualizarTarefasComponent} from "./componentes/visualizar-tarefas/visualizar-tarefas.component";
import {VisualizarMarcacoesComponent} from "./componentes/visualizar-marcacoes/visualizar-marcacoes.component";
import {MarcarComponent} from "./componentes/marcar/marcar.component";
import {CardapioComponent} from "./componentes/cardapio/cardapio.component";

const routes: Routes = [
  {path: "", redirectTo: "pagina-inicial",
    pathMatch: "full" },
  {path: "pagina-inicial", component: PaginaInicialComponent},
  {path: "visualizar-tarefas", component: VisualizarTarefasComponent},
  {path: "visualizar-marcacoes", component: VisualizarMarcacoesComponent},
  {path: "marcar", component: MarcarComponent},
  {path: "cardapio", component: CardapioComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
