module.exports = (sequelize, Sequelize) => {
	const Estudiante = sequelize.define('estudiante', {
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  nombre: {
			type: Sequelize.STRING
	  },
	  apellido: {
			type: Sequelize.STRING
  	},
	  direccion: { 
			type: Sequelize.STRING
	  },
	  telefono: {
			type: Sequelize.INTEGER
    },
    nit: {
        type: Sequelize.INTEGER
    },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'I CAN DO IT'
    }
	});
	
	return Estudiante;
}
