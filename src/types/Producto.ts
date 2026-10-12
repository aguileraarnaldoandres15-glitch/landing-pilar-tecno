// Definimos el tipo de datos Producto que representa un producto en nuestro sistema

export type Producto = {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  proveedor?: string;
};

// Definimos el tipo de datos ProductoFormulario que representa los datos necesarios para crear o actualizar un producto, excluyendo el _id y el proveedor
export type ProductoFormulario = Pick<Producto, "nombre" | "descripcion" | "precio" | "stock">;