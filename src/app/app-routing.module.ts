import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProduitComponent} from "./produit/produit.component";
import {TypeComponent} from "./type/type.component";

const routes: Routes = [
  {path: '',component: ProduitComponent},
  {path: 'types',component:TypeComponent},
  {path: 'produits',component:ProduitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
