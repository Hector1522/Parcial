const db = require('../config/db.config.js');
const Libro = db.libros;

exports.create = async (req, res) => { 
    try {
        let libro = {
            nombre_libro: req.body.nombre_libro,
            editorial: req.body.editorial,
            autor: req.body.autor,
            genero: req.body.genero,
            pais_autor: req.body.pais_autor,
            numero_paginas: req.body.numero_paginas,
            anio_edicion: req.body.anio_edicion,
            moneda: req.body.moneda
        };

        let result = await Libro.create(libro); 
        res.status(200).json({
            message: "Upload Successfully a book with id = " + result.id,
            libro: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllLibros = (req, res) => {
    Libro.findAll()
        .then(librosInfos => {
            res.status(200).json({
                message: "Get all books' Infos Successfully",
                libros: librosInfos  
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

exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "Successfully Get a Book with id = " + libroId,
                libro: libro
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

exports.filteringByAnio = (req, res) => {
    let anio_edicion = req.query.anio_edicion;

    Libro.findAll({
        attributes: ['codigo_libro', 'nombre_libro', 'editorial', 'autor', 'genero', 'pais_autor', 'numero_paginas', 'anio_edicion', 'moneda'],
        where: { anio_edicion: anio_edicion }
    })
    .then(results => {
        res.status(200).json({
            message: "Get all books with year = " + anio_edicion,
            libros: results,
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

        Libro.findAndCountAll({ limit: limit, offset: offset })
        .then(data => {
            const totalPages = Math.ceil(data.count / limit);
            const response = {
                messages: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
                data: {
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "currentPageNumber": page + 1,
                    "currentPageSize": data.rows.length,
                    "libros": data.rows 
                }
            };
            res.send(response);
        });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can Not Complete a paging request!",
            error: error.message,
        });
    }
}

exports.pagifilteringsortin = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let anio_edicion = parseInt(req.query.anio_edicion);

        const offset = page ? page * limit : 0;
        
        console.log("offset = " + offset);

        Libro.findAndCountAll({
            attributes: ['codigo_libro', 'nombre_libro', 'editorial', 'autor', 'genero', 'pais_autor', 'numero_paginas', 'anio_edicion', 'moneda'],
            where: { anio_edicion: anio_edicion },
            order: [
                ['nombre_libro', 'ASC'],
                ['autor', 'DESC']
            ],
            limit: limit,
            offset: offset
        })
        .then(data => {
            const totalPages = Math.ceil(data.count / limit);
            const response = {
                message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", anio = " + anio_edicion,
                data: {
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "anio-filtering": anio_edicion,
                    "currentPageNumber": page + 1,
                    "currentPageSize": data.rows.length,
                    "libros": data.rows
                }
            };
            res.send(response);
        });
    } catch (error) {
        res.status(500).send({
            messages: "Error -> Can NOT Complete a paging request!",
            error: error.message,
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "Not Found for updating a book with id " + libroId,
                libro: "",
                error: "404"
            });
        } else {
            let updateObject = {
                nombre_libro: req.body.nombre_libro,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                pais_autor: req.body.pais_autor,
                numero_paginas: req.body.numero_paginas,
                anio_edicion: req.body.anio_edicion,
                moneda: req.body.moneda 
            }
            let result = await Libro.update(updateObject, { returning: true, where: { id: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a book with id = " + req.params.id,
                    error: "Can Not Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a book with id = " + libroId,
                libro: updateObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a book with id = " + req.params.id,
            error: error.message
        });
    }
}
exports.deleteById = (req, res) => {
    let libroId = req.params.id;

    Libro.destroy({ where: { codigo_libro: libroId } })
        .then(() => {
            res.status(200).json({
                message: "Deleted successfully a book with id = " + libroId
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Could not delete book with id = " + libroId,
                error: error.message
            });
        });
};