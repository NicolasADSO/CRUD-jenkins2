import masterModel from "../models/masterModel.js"
import { validateInput } from "../utils/productsValidation.js";

const MasterModel = new masterModel();
class productControllers{

    // GET de productos.
    static async products(req, res, next){
        try {
            const productos = await MasterModel.selectAll('productos');
            res.render('index/index',{
                title: "Productos",
                productos,
            })
        } catch (error) {
            next(error)
        }
    }

    // GET crear producto.
    static createProduct(req, res, next){
        res.render('index/create', {title: "Nuevo Producto"});
    }

    // POST crear producto.
    static async handleCreateProduct(req, res, next){

        const {nombre, precio, imagen, descripcion } = req.body;

        const {errors, s} = validateInput(nombre, precio, imagen, descripcion);

        if(errors.length > 0){
            return res.render('index/create', {
                title: "Nuevo Producto",
                errors,
                product: {nombre, precio, imagen, descripcion}
            });
        }

        try {
            const productExist = await MasterModel.selectByField(
                'productos',
                'nombre',
                nombre,
                'nombre'
            );

            if(productExist.length > 0 && productExist[0].nombre){
                errors.push({
                    msg: 'El producto ya existe',
                    type: 'danger'
                });
            }

            console.log(errors)
            if(errors.length > 0){
                return res.render('index/create', {
                    title: "Nuevo Producto",
                    errors,
                    product: {nombre, precio, imagen , descripcion}
                })
            }

            const result = await MasterModel.insertData(
                'productos',
                {
                    nombre: s.nombre,
                    precio: s.precio,
                    imagen: s.imagen,
                    descripcion: s.descripcion

                }
            )

            console.log((result));
            

            if(result.affectedRows > 0){
                res.flash('El producto fue creado exitosamente')
                return res.redirect('/');
            }else{
                res.flash('Hubo un error al crear el producto')
            }

        } catch (error) {
            next(error)
        }
    }

    // GET actualizar producto.
    static async updateProduct(req, res, next){
        const idProduct = req.params.id;

        if(!idProduct || isNaN(idProduct)){
            const err = new Error("No existe el id de producto solicitado");
            err.status = 404;
            return next(err);
        }


        try {
            const productExist = await MasterModel.selectByField(
                'productos',
                'id',
                idProduct
            );

            if(productExist.length === 0){
                const err = new Error("No existe el id solicitado");
                err.status = 404;
                return next(err);
            }


            return res.render('index/update',{
                title: 'Actualizar producto',
                producto:{
                    nombre: productExist[0].nombre,
                    precio: productExist[0].precio,
                    imagen: productExist[0].imagen,
                    descripcion: productExist[0].descripcion
                }
            })
        } catch (error) {
            next(error)
        }
    }

    // POST actualizar producto.
    static async handleUpdateProduct(req, res, next){

        const {nombre, precio, imagen, descripcion} = req.body;

        const idProduct = req.params.id;

        if(!idProduct || isNaN(idProduct)){
            const err = new Error("ID de producto no encontrado");
            err.status = 404;
            return next(err);
        }


        try {
            const productExist = await MasterModel.selectByField(
                'productos',
                'id',
                idProduct
            );

            console.log(productExist)

            if(productExist === 0){
                const err = new Error("El producto no existe");
                err.status = 404;
                return next(err);
            }


            const {errors , s} = validateInput(nombre, precio, imagen, descripcion);

            const nombreExists = await MasterModel.selectByFieldExcludingId(
                'productos',
                'nombre',
                nombre,
                idProduct,
                'nombre'
            );

            console.log(nombreExists)

            if(nombreExists && nombreExists.length !== 0){
                errors.push({
                    msg: "El producto ya existe",
                    type: "danger"
                });
            }

            console.log(errors)

            if(errors.length > 0){
                return res.render('index/update',{
                    title: "Actualizar Producto",
                    errors,
                    producto: {
                        nombre: productExist[0].nombre,
                        precio: productExist[0].precio,
                        imagen: productExist[0].imagen,
                        descripcion: productExist[0].descripcion,
                    }
                } )
            }


            const result = await MasterModel.update(
                'productos',
                {
                    nombre: s.nombre,
                    precio: s.precio,
                    imagen: s.imagen,
                    descripcion: s.descripcion
                },
                'id',
                idProduct
            );

            console.log(result)

            if(result.affectedRows > 0){
                res.flash('Success', 'El producto fue creado exitosamente');
                return res.redirect('/');
            }else{
                res.flash('error', 'No se pudo crear el producto');
                return res.redirect('/');
            }

        } catch (error) {
            next(error)
        }
        
    }

    static async deleteProduct(req, res, next){
        const idProduct = parseInt(req.params.id);

        console.log(idProduct);

        if(!idProduct || isNaN(idProduct)){
            const err = new Error('ID de producto no encontrado');
            err.status = 404;
            return next(err);
        }

        console.log(idProduct);
        try {
            const productExist = await MasterModel.selectByField(
                'productos',
                'id',
                idProduct
            )

            console.log(productExist);
            

            if(productExist.length === 0 ){
                const err = new Error('Producto no encontrado');
                err.status = 404;
                return next(err);
            }


            if(productExist[0].id !== parseInt(idProduct)){
                const err = new Error('No estas autorizado');
                err.status = 403;
                return next(err);
            }


            const deleteProduct = await MasterModel.delete(
                'productos',
                'id',
                idProduct
            )

            console.log(deleteProduct)

            if(deleteProduct.affectedRows > 0){
                req.flash('success', 'El cliente fue creado correctamente');
                return res.redirect('/');

            }else{
                res.flash('error', 'Hubo un error al eliminar el cliente');
                return res.redirect('/');
            }


        } catch (error) {
            next(error)
        }
    }
}

export default productControllers;