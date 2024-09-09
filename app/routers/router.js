
let express = require('express');
let router = express.Router();

 //constasntes de rutas 
const customers = require('../controllers/controller.js');
const repartidores = require('../controllers/repartidorController.js');
const libros = require('../controllers/Libros.js');
const prestamo = require('../controllers/prestamo.js');
const estudiante = require('../controllers/estudiante.js');


router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

router.post('/api/repartidores/create', repartidores.create);
router.get('/api/repartidores/all', repartidores.retrieveAllRepartidores);
router.get('/api/repartidores/onebyid/:id', repartidores.getRepartidorById);
router.get('/api/repartidores/filteringbyage', repartidores.filteringByAge);
router.get('/api/repartidores/pagination', repartidores.pagination);
router.get('/api/repartidores/pagefiltersort', repartidores.pagingfilteringsorting);
router.put('/api/repartidores/update/:id', repartidores.updateById);
router.delete('/api/repartidores/delete/:id', repartidores.deleteById);


router.post('/api/libros/create', libros.create);  // Crear un nuevo libro
router.get('/api/libros/all', libros.retrieveAllLibros);  // Recuperar todos los libros
router.get('/api/libros/onebyid/:id', libros.getLibroById);  // Recuperar un libro por su ID
router.get('/api/libros/filteringbyanio', libros.filteringByAnio);  // Filtrar libros por año de edición
router.get('/api/libros/pagination', libros.pagination);  // Paginación de libros
router.get('/api/libros/pagefiltersort', libros.pagifilteringsortin);  // Paginación, filtrado y ordenación de libros
router.put('/api/libros/update/:id', libros.updateById);  // Actualizar un libro por su ID
router.delete('/api/libros/delete/:id', libros.deleteById);

//Rutas para Prestamo
router.post('/api/prestamo/create', prestamo.create);
router.get('/api/prestamo/all', prestamo.retrieveAllPrestamos);
router.get('/api/prestamo/onebyid/:id', prestamo.getPrestamoById);
router.get('/api/prestamo/filterbyuser', prestamo.filteringByCodigoUsuario);
router.get('/api/prestamo/pagination', prestamo.pagination);
router.get('/api/prestamo/pagifilteringsortin', prestamo.pagifilteringsortin);
router.put('/api/prestamo/update/:id', prestamo.updateById);
router.delete('/api/prestamo/delete/:id', prestamo.deleteById);


// Rutas de estudiante
router.post('/api/estudiante/create', estudiante.create);
router.get('/api/estudiante/onebyid/:id', estudiante.getEstudianteById);
router.get('/api/estudiante/all', estudiante.retrieveAllEstudiante);
router.put('/api/estudiante/update/:id', estudiante.updateById);
router.delete('/api/estudiante/delete/:id', estudiante.deleteById);

module.exports = router;