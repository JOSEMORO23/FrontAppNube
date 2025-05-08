import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

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
  
  constructor(private usuarioService: UsuarioService) {}

  registrar() {
    const usuario = { nombres: this.nombres, apellidos: this.apellidos, correo: this.correo, clave: this.clave };
    this.usuarioService.registrarUsuario(usuario).subscribe(
      (res) => {
        alert('Usuario registrado con éxito');
      },
      (err) => {
        alert('Error al registrar usuario');
      }
    );
  }
}
