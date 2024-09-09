module.exports = (sequelize, DataTypes) => {
    const Prestamo = sequelize.define('prestamo', { 
        numero_pedido: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        codigo_libro: { 
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        codigo_usuario: { 
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        fecha_salida: {
            type: DataTypes.DATE, 
            allowNull: false
        },
        fechaMaxima_devolucion: {
            type: DataTypes.DATE,  
            allowNull: false
        },
        fecha_devolucion: {
            type: DataTypes.DATE,
            allowNull: false
        },
    });

    return Prestamo;  
}