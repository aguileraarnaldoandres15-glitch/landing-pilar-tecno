export type Producto = {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  proveedor?: string; // Opcional, como lo tenías en tu backend
};

// Este es el tipo que va a usar Formik, descartando el _id porque lo genera directamente Mongo de manera automática
export type ProductoFormulario = Pick<Producto, "nombre" | "descripcion" | "precio" | "stock">;