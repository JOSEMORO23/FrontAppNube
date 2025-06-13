import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombres: string = '';
  apellidos: string = '';
  correo: string = '';
  clave: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrar() {
    const usuario = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      correo: this.correo,
      clave: this.clave
    };

    this.usuarioService.registrarUsuario(usuario).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El usuario ha sido registrado correctamente.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'No se pudo registrar el usuario. Verifica los datos.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    );
  }
}
