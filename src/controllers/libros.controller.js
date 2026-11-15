import * as service from '../services/libros.service.js';

export async function listar(req, res) {
    res.json(await service.listar({q: req.query.q}));
}

export async function obtener(req, res) {
  res.json(await service.obtener(Number(req.params.id)));
}

export async function crear(req, res) {
  const creado = await service.crear(req.body);
  res.status(201).location(`/api/libros/${creado.id}`).json(creado);
}

export async function actualizar(req, res) {
  res.json(await service.actualizar(Number(req.params.id), req.body));
}

export async function eliminar(req, res) {
  await service.eliminar(Number(req.params.id));
  res.status(204).end();
}