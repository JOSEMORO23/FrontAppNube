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
  mostrarErrorClave: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  registrar() {
    // ✅ 1️⃣ Validamos la clave primero
    if (!this.validarClave(this.clave)) {
      this.mostrarErrorClave = true;
      return;
    }

    // ✅ 2️⃣ Ahora verificamos si el correo existe
    this.usuarioService.existeEmail(this.correo).subscribe((existe) => {
      if (existe) {
        Swal.fire({
          icon: 'error',
          title: 'Usuario existente',
          text: 'Ya existe un usuario registrado con este correo electrónico.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Intentar con otro'
        });
      } else {
        // ✅ 3️⃣ Si NO existe, hacemos el registro
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
    });
  }

  private validarClave(clave: string): boolean {
    const tieneLetra = /[a-zA-Z]/.test(clave);
    const tieneNumero = /\d/.test(clave);
    const longitudValida = clave.length >= 6;
    return tieneLetra && tieneNumero && longitudValida;
  }
}
