import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //private url = environment.apiBaseUrl;
private url = 'http://localhost:8081/api/usuarios';; // Cambia al puerto adecuado si es necesario

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.url}/registro`, usuario);
  }

  login(correo: string, clave: string): Observable<any> {
    // Aquí puedes realizar la lógica para hacer el login
    return this.http.post(`${this.url}/login`, { correo, clave });
  }
}
