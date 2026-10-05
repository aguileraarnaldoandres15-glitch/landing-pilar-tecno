// src/services/productoService.ts
import axios from "axios";
import type { Producto, ProductoFormulario } from "../types/Producto";

// URL de Vercel
const BASE_URL = "https://api-inventario-moto.vercel.app/api/productos";

export const obtenerProductos = async (): Promise<Producto[]> => {
  const respuesta = await axios.get(BASE_URL);
  return respuesta.data;
};

export const crearProducto = async (datos: ProductoFormulario): Promise<Producto> => {
  const respuesta = await axios.post(BASE_URL, datos);
  return respuesta.data;
};

export const actualizarProducto = async (id: string, datos: ProductoFormulario): Promise<Producto> => {
  const respuesta = await axios.put(`${BASE_URL}/${id}`, datos);
  return respuesta.data;
};

export const eliminarProducto = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};