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

  logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}


login() {
  this.usuarioService.login(this.correo, this.clave).subscribe(
    (res) => {
      localStorage.setItem('token', 'logueado'); // ✅ MARCAR SESIÓN ACTIVA
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
