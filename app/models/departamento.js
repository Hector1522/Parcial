module.exports = (sequelize, Sequelize) => {
	const Departamento = sequelize.define('departamento', {
	  id_departamento: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  descripcion: {
			type: Sequelize.STRING
	  },
	});
	
	return Repartidor;
}