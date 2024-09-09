const db = require('../config/db.config.js');
const Prestamo = db.prestamo;

exports.create = async (req, res) => {
    try {
        let prestamo = {
            codigo_libro: req.body.codigo_libro,
            codigo_usuario: req.body.codigo_usuario,
            fecha_salida: req.body.fecha_salida,
            fechaMaxima_devolucion: req.body.fechaMaxima_devolucion,
            fecha_devolucion: req.body.fecha_devolucion
        };

        let result = await Prestamo.create(prestamo); 
        res.status(200).json({
            message: "Préstamo creado exitosamente con id = " + result.numero_pedido,
            prestamo: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

exports.retrieveAllPrestamos = (req, res) => {
    Prestamo.findAll()
        .then(prestamos => {
            res.status(200).json({
                message: "Préstamos recuperados exitosamente",
                prestamos: prestamos  
            });
        })
        .catch(error => {
            console.log(error);   
            res.status(500).json({
                message: "Error",
                error: error.message
            });
        });
}

exports.getPrestamoById = (req, res) => {
    let prestamoId = req.params.id;
    Prestamo.findByPk(prestamoId)
        .then(prestamo => {
            res.status(200).json({
                message: "Préstamo recuperado exitosamente con id = " + prestamoId,
                prestamo: prestamo
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error.message
            });
        });   
}

exports.filteringByCodigoUsuario = (req, res) => {
    let codigo_usuario = req.query.codigo_usuario;

    Prestamo.findAll({
        attributes: ['numero_pedido', 'codigo_libro', 'codigo_usuario', 'fecha_salida', 'fechaMaxima_devolucion', 'fecha_devolucion'],
        where: { codigo_usuario: codigo_usuario }
    })
    .then(results => {
        res.status(200).json({
            message: "Préstamos recuperados para el usuario con código = " + codigo_usuario,
            prestamos: results,
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    });
}

exports.pagination = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        
        const offset = page ? page * limit : 0;

        Prestamo.findAndCountAll({ limit: limit, offset: offset })
        .then(data => {
            const totalPages = Math.ceil(data.count / limit);
            const response = {
                message: "Paginación completada! Parámetros: página = " + page + ", límite = " + limit,
                data: {
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": page + 1,
                    "currentPageSize": data.rows.length,
                    "prestamos": data.rows 
                }
            };
            res.send(response);
        });
    } catch (error) {
        res.status(500).send({
            message: "Error! No se pudo completar la solicitud de paginación!",
            error: error.message,
        });
    }
}

exports.pagifilteringsortin = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let codigo_libro = parseInt(req.query.codigo_libro);

        const offset = page ? page * limit : 0;
        
        Prestamo.findAndCountAll({
            attributes: ['numero_pedido', 'codigo_libro', 'codigo_usuario', 'fecha_salida', 'fechaMaxima_devolucion', 'fecha_devolucion'],
            where: { codigo_libro: codigo_libro },
            order: [
                ['fecha_salida', 'ASC'],
                ['fecha_devolucion', 'DESC']
            ],
            limit: limit,
            offset: offset
        })
        .then(data => {
            const totalPages = Math.ceil(data.count / limit);
            const response = {
                message: "Solicitud de Paginación, Filtrado y Ordenación completada! Parámetros: página = " + page + ", límite = " + limit + ", código libro = " + codigo_libro,
                data: {
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "codigo-libro-filtrado": codigo_libro,
                    "currentPageNumber": page + 1,
                    "currentPageSize": data.rows.length,
                    "prestamos": data.rows
                }
            };
            res.send(response);
        });
    } catch (error) {
        res.status(500).send({
            message: "Error! No se pudo completar la solicitud de paginación!",
            error: error.message,
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "No se encontró el préstamo para actualizar con id " + prestamoId,
                prestamo: "",
                error: "404"
            });
        } else {
            let updateObject = {
                codigo_libro: req.body.codigo_libro,
                codigo_usuario: req.body.codigo_usuario,
                fecha_salida: req.body.fecha_salida,
                fechaMaxima_devolucion: req.body.fechaMaxima_devolucion,
                fecha_devolucion: req.body.fecha_devolucion
            }
            let result = await Prestamo.update(updateObject, { returning: true, where: { numero_pedido: prestamoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error! No se pudo actualizar el préstamo con id = " + prestamoId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Préstamo actualizado exitosamente con id = " + prestamoId,
                prestamo: updateObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error! No se pudo actualizar el préstamo con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = (req, res) => {
    let prestamoId = req.params.id;

    Prestamo.destroy({ where: { numero_pedido: prestamoId } })
        .then(() => {
            res.status(200).json({
                message: "Préstamo eliminado exitosamente con id = " + prestamoId
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "No se pudo eliminar el préstamo con id = " + prestamoId,
                error: error.message
            });
        });
};