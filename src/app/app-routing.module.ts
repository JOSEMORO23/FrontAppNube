import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { ProductoComponent } from './producto/producto.component';
import { ListarProductoComponent } from './listar-producto/listar-producto.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'productos', component: ProductoComponent },
  { path: 'listar-producto', component: ListarProductoComponent },
  { path: 'bienvenida', component: BienvenidaComponent, canActivate: [AuthGuard] },  // protegida
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
