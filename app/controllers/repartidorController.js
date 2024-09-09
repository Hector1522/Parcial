const db = require('../config/db.config.js');
const Repartidor = db.Repartidor;

exports.create = (req, res) => {
    let repartidor = {};

    try {//ingresar los dartos denlas tablas 
        repartidor.firstname = req.body.firstname;
        repartidor.lastname = req.body.lastname;
        repartidor.address = req.body.address;
        repartidor.age = req.body.age;
        // crear la tabla 
        Repartidor.create(repartidor).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Repartidor with id = " + result.id,
                repartidor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllRepartidores = (req, res) => {
    Repartidor.findAll()
        .then(repartidorInfos => {
            res.status(200).json({
                message: "Get all Repartidores' Infos Successfully!",
                repartidores: repartidorInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getRepartidorById = (req, res) => {
    let repartidorId = req.params.id;
    Repartidor.findByPk(repartidorId)
        .then(repartidor => {
            res.status(200).json({
                message: " Successfully Get a Repartidor with id = " + repartidorId,
                repartidor: repartidor
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.filteringByAge = (req, res) => {
    let age = req.query.age;

    Repartidor.findAll({
        attributes: ['id', 'firstname', 'lastname', 'age', 'address'],
        where: { age: age }
    })
    .then(results => {
        res.status(200).json({
            message: "Get all Repartidores with age = " + age,
            repartidores: results,
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
}

exports.pagination = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        const offset = page ? page * limit : 0;

        Repartidor.findAndCountAll({ limit: limit, offset: offset })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
                    data: {
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "repartidores": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}

exports.pagingfilteringsorting = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let age = parseInt(req.query.age);

        const offset = page ? page * limit : 0;

        Repartidor.findAndCountAll({
            attributes: ['id', 'firstname', 'lastname', 'age', 'address'],
            where: { age: age },
            order: [
                ['firstname', 'ASC'],
                ['lastname', 'DESC']
            ],
            limit: limit,
            offset: offset
        })
        .then(data => {
            const totalPages = Math.ceil(data.count / limit);
            const response = {
                message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
                data: {
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "age-filtering": age,
                    "currentPageNumber": page + 1,
                    "currentPageSize": data.rows.length,
                    "repartidores": data.rows
                }
            };
            res.send(response);
        });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let repartidorId = req.params.id;
        let repartidor = await Repartidor.findByPk(repartidorId);

        if (!repartidor) {
            res.status(404).json({
                message: "Not Found for updating a Repartidor with id = " + repartidorId,
                repartidor: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                age: req.body.age
            }
            let result = await Repartidor.update(updatedObject, { returning: true, where: { id: repartidorId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Repartidor with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Repartidor with id = " + repartidorId,
                repartidor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a Repartidor with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let repartidorId = req.params.id;
        let repartidor = await Repartidor.findByPk(repartidorId);

        if (!repartidor) {
            res.status(404).json({
                message: "Does Not exist a Repartidor with id = " + repartidorId,
                error: "404",
            });
        } else {
            await repartidor.destroy();
            res.status(200).json({
                message: "Delete Successfully a Repartidor with id = " + repartidorId,
                repartidor: repartidor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Repartidor with id = " + req.params.id,
            error: error.message,
        });
    }
}
