module.exports = (sequelize, Sequelize) => {
	const Repartidor = sequelize.define('repartidor', {
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  firstname: {
			type: Sequelize.STRING
	  },
	  lastname: {
			type: Sequelize.STRING
  	},
	  address: {
			type: Sequelize.STRING
	  },
	  age: {
			type: Sequelize.INTEGER
    },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Repartidor;
}