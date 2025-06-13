import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  nuevoProducto: Producto = {
    nombre: '',
    stock: 0,
    precio: 0,
    categoria: ''
  };

  categorias: string[] = [
    'Frescos',
    'Lácteos',
    'Congelados',
    'Despensa',
    'Bebidas',
    'Cuidado personal',
    'Limpieza del hogar',
    'Mascotas',
    'Electrónicos',
    'Ropa'
  ];

  constructor(private productoService: ProductoService) {}

  guardarProducto(): void {
    if (
      !this.nuevoProducto.nombre ||
      this.nuevoProducto.stock < 0 ||
      this.nuevoProducto.precio < 0 ||
      !this.nuevoProducto.categoria
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios y deben tener valores válidos.'
      });
      return;
    }

    this.productoService.guardar(this.nuevoProducto).subscribe(() => {
      this.nuevoProducto = { nombre: '', stock: 0, precio: 0, categoria: '' };

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Producto registrado correctamente ',
        confirmButtonText: 'Aceptar'
      });
    });
  }

  validarDecimal(event: KeyboardEvent): void {
    const pattern = /[0-9.]/;
    const inputChar = String.fromCharCode(event.keyCode);
    const input = event.target as HTMLInputElement;

    if (!pattern.test(inputChar) || (inputChar === '.' && input.value.includes('.'))) {
      event.preventDefault();
    }
  }
}
