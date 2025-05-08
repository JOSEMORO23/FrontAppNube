import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  clave: string = '';
  
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login() {
    this.usuarioService.login(this.correo, this.clave).subscribe(
      (res) => {
        // Redirige a la pantalla de bienvenida
        this.router.navigate(['/bienvenida']);
      },
      (err) => {
        alert('Credenciales incorrectas');
      }
    );
  }
}
