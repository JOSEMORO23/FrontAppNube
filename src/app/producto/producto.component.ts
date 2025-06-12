import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  nuevoProducto: Producto = {
    nombre: '',
    stock: 0,
    precio: 0,
    categoria: ''
  };
  editando: boolean = false;
  idEditando: number | null = null;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(): void {
    this.productoService.listar().subscribe(data => {
      this.productos = data;
    });
  }

  guardarProducto(): void {
  const productoAGuardar: Producto = this.editando && this.idEditando != null
    ? { ...this.nuevoProducto, id: this.idEditando }
    : this.nuevoProducto;

  this.productoService.guardar(productoAGuardar).subscribe(() => {
    this.listarProductos();
    this.cancelarEdicion(); // Esto limpia y resetea el formulario
  });
}


  editarProducto(producto: Producto): void {
    this.nuevoProducto = { ...producto };
    this.idEditando = producto.id!;
    this.editando = true;
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.idEditando = null;
    this.nuevoProducto = { nombre: '', stock: 0, precio: 0, categoria: '' };
  }

 
}
