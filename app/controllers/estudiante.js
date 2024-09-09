const db = require('../config/db.config.js');
const Estudiante = db.estudiante; // Cambiado a 'estudiantes' para que coincida con el modelo

exports.create = async (req, res) => { 
    try {
        let estudiante = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion, 
            telefono: req.body.telefono,
            nit: req.body.nit
        };

        let result = await Estudiante.create(estudiante); 
        res.status(200).json({
            message: "Upload Successfully a estudiante with id = " + result.id,
            estudiante: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllEstudiante = (req, res) => { // Recuperar
    Estudiante.findAll()
        .then(estudianteInfos => {
            res.status(200).json({
                message: "Get all estudiantes' Infos Successfully",
                estudiante: estudianteInfos  
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

exports.getEstudianteById = (req, res) => { // Obtener
    let estudianteId = req.params.id;
    Estudiante.findByPk(estudianteId)
        .then(estudiante => {
            res.status(200).json({
                message: "Successfully Get a estudiante with id = " + estudianteId,
                estudiante: estudiante
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

exports.pagination = (req, res) => { // Paginación
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        
        const offset = page ? page * limit : 0;

        Estudiante.findAndCountAll({ limit: limit, offset: offset })
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
                    "estudiante": data.rows 
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

exports.updateById = async (req, res) => {
    try {
        let estudianteId = req.params.id;
        let estudiante = await Estudiante.findByPk(estudianteId);

        if (!estudiante) {
            res.status(404).json({
                message: "Not Found for updating a estudiante with id " + estudianteId,
                estudiante: "",
                error: "404"
            });
        } else {
            let updateObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                nit: req.body.nit
            }
            let result = await Estudiante.update(updateObject, { returning: true, where: { id: estudianteId } });

            if (!result[0]) { // Corregido para verificar el primer elemento del array de resultados
                res.status(500).json({
                    message: "Error -> Can not update a estudiante with id = " + req.params.id,
                    error: "Can Not Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a estudiante with id = " + estudianteId,
                estudiante: updateObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a estudiante with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = (req, res) => {
    let estudianteId = req.params.id; // Corregido de 'libroId' a 'estudianteId'

    Estudiante.destroy({ where: { id: estudianteId } }) // Corregido de 'estudianteId' a 'estudianteId'
        .then(() => {
            res.status(200).json({
                message: "Deleted successfully a estudiante with id = " + estudianteId
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Could not delete estudiante with id = " + estudianteId, // Corregido de 'book' a 'estudiante'
                error: error.message
            });
        });
};
