import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  productos: Producto[] = [];
  productoEditando: Producto | null = null;

  categorias: string[] = [
    'frescos', 'lácteos', 'congelados', 'despensa',
    'bebidas', 'cuidado personal', 'limpieza del hogar',
    'mascotas', 'electrónicos', 'ropa'
  ];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.listar().subscribe(data => {
      this.productos = data;
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
  editar(producto: Producto): void {
    this.productoEditando = { ...producto };
  }

  actualizar(): void {
    if (this.productoEditando) {
      this.productoService.guardar(this.productoEditando).subscribe(() => {
        this.productoEditando = null;
        this.obtenerProductos();
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado ',
          text: 'Los datos del producto fueron guardados correctamente.'
        });
      });
    }
  }

  cancelar(): void {
    this.productoEditando = null;
  }
  
}
