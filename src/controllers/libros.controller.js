src/controllers/libros.controller.js
// CAPA DE PRESENTACIÓN (controlador)
// Traduce HTTP <-> servicio: lee req, llama al servicio y arma la respuesta.
// No contiene reglas de negocio ni accede a los datos.
import * as librosService from '../services/libros.service.js';
export async function listar(req, res) {
  const { q, categoria } = req.query;
  res.json(await librosService.listar({ q, categoriaId: categoria }));
}
export async function obtener(req, res) {
  res.json(await librosService.obtener(Number(req.params.id)));
}
export async function crear(req, res) {
  const libro = await librosService.crear(req.body);
  res.status(201).location(`/api/libros/${libro.id}`).json(libro);
}
export async function actualizar(req, res) {
  res.json(await librosService.actualizar(Number(req.params.id), req.body));
}
export async function eliminar(req, res) {
  await librosService.eliminar(Number(req.params.id));
  res.status(204).end();
}