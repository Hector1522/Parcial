const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Libro = sequelize.define('libro', { 
        codigo_libro: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true // Asegúrate de que esta línea esté presente
        },
        nombre_libro: {
            type: DataTypes.STRING,
            allowNull: false
        },
        editorial: {
            type: DataTypes.TEXT
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pais_autor: {
            type: DataTypes.STRING
        },
        numero_paginas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        anio_edicion: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        moneda: {
            type: DataTypes.FLOAT, 
            allowNull: false // Este campo no debe permitir valores nulos
        }
    });
    
    return Libro;
}