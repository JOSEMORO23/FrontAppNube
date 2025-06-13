import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido a RapiTec',
          text: 'Has iniciado sesión con éxito',
          confirmButtonColor: '#1e3799'
        }).then(() => {
          this.router.navigate(['/bienvenida']);
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Credenciales incorrectas',
          confirmButtonColor: '#e74c3c'
        });
      }
    );
  }
}
