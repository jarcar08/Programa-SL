import * as service from '../services/autores.service.js';

export async function listar(req, res) {
    try {
        const resultado = await service.listar({ q: req.query.q });
        res.json(resultado);
    } catch (error) {
        console.error("Error en listar autores:", error);
        res.status(500).json({ error: error.message });
    }
}

export async function obtener(req, res) {
    try {
        // Ojo aquí: cambiamos a buscarPorId que es como se llama en tu servicio
        const resultado = await service.buscarPorId(Number(req.params.id));
        if (!resultado) return res.status(404).json({ mensaje: "Autor no encontrado" });
        res.json(resultado);
    } catch (error) {
        console.error("Error en obtener autor:", error);
        res.status(500).json({ error: error.message });
    }
}

export async function crear(req, res) {
    try {
        const creado = await service.crear(req.body);
        res.status(201).location(`/api/autores/${creado.id}`).json(creado);
    } catch (error) {
        console.error("Error en crear autor:", error);
        res.status(500).json({ error: error.message });
    }
}

export async function actualizar(req, res) {
    try {
        const actualizado = await service.actualizar(Number(req.params.id), req.body);
        if (!actualizado) return res.status(404).json({ mensaje: "Autor no encontrado" });
        res.json(actualizado);
    } catch (error) {
        console.error("Error en actualizar autor:", error);
        res.status(500).json({ error: error.message });
    }
}

export async function eliminar(req, res) {
    try {
        const eliminado = await service.eliminar(Number(req.params.id));
        if (!eliminado) return res.status(404).json({ mensaje: "Autor no encontrado" });
        res.status(204).end();
    } catch (error) {
        console.error("Error en eliminar autor:", error);
        res.status(500).json({ error: error.message });
    }
}