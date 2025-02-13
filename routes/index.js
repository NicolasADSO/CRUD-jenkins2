// Required Modules
import express from 'express';
import usersController from '../controllers/usersControllers.js'
import productControllers from '../controllers/productsController.js'


// Variables
let router = express.Router();

/**Products */
router.get('/', productControllers.products);

router.get('/crear', productControllers.createProduct);

router.post('/crear', productControllers.handleCreateProduct);

router.get('/actualizar/:id', productControllers.updateProduct);

router.post('/actualizar/:id', productControllers.handleUpdateProduct);

router.delete('/delete/:id', productControllers.deleteProduct)



/**Usuarios */

// Get Usuarios
router.get('/admin', usersController.users);

// Get Crear usuario
router.get('/nuevoUsuario', usersController.createUser);

// Get actualizar Usuario
router.get('/admin/actualizarUsuario/:id',usersController.updateUser)

// PUT actualizar usuario
router.put('/admin/actualizarUsuario/:id', usersController.handleUpdateUser);

// POST nuevo usuario
router.post('/nuevoUsuario', usersController.handleCreateUser);

// DELETE usuario
router.delete('/delete/:id', usersController.deleteUser);

export default router;
