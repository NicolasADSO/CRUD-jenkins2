import masterModel from "../models/masterModel.js"
import { validateInput } from "../utils/validation.js"


const MasterModel =  new masterModel();

class usersController{

    // Users
    static async users(req, res, next){
        try {
            const customers = await MasterModel.selectAll('customers');
            res.render('index/users',{
                title: "Lista de usuarios",
                customers
            })
        } catch (error) {
            next(error)
        }
    } 

    // Create User
    static createUser(req, res, next){
        res.render('index/createUser', {title: "Nuevo Usuario"})
    }

    //Update User
    static async updateUser(req, res, next){
        const idCustomer = req.params.id;
        
        if(!idCustomer || isNaN(idCustomer)){
            const err = new Error("No existe el id solicitado");
            err.status = 404;
            return next(err);
        }
        
        try {
            const customerExist = await MasterModel.selectByField('customers', 'id', idCustomer);
            console.log(customerExist);
            

            if(customerExist.length === 0){
                const err = new Error("No existe el id solicitado");
                err.status = 404;
                return next(err);
            }
                    
            return res.render('index/updateUser',{
                title: "Editar Usuario",
                customer: {
                    nombre: customerExist[0].nombre,
                    email: customerExist[0].email,
                    password: customerExist[0].password,
                    direccion: customerExist[0].direccion
                }
            });

        } catch (error) {
            next(error)
        }

    }

    /**
     * POST Routes
    */
    static async handleCreateUser(req, res, next){
         const {nombre, email, password, direccion } = req.body;
         
         const {errors, s} = validateInput(nombre, email, password, direccion)
         
 
         if(errors.length > 0){
              return res.render('index/createUser', {
                 title: "Nuevo Usuario",
                 errors,
                 customer: {nombre, email, password, direccion},
             })
         }
 
         try {
 
             const customerExist = await MasterModel.selectByField('customers','email', email, 'email');
 
             if(customerExist.length > 0 && customerExist[0].email === email){
                 errors.push({msg: "El cliente ya existe", type: "danger"});
             }
 
 
             if(errors.length > 0){
                 return res.render('index/createUser', {
                    title: "Nuevo Usuario",
                    errors,
                    customer: {nombre, email, password,verify },
                })
             }
 
             const result = await MasterModel.insertData('customers', {
                 nombre: s.nombre,
                 email: s.email,
                 password: s.password,
                 direccion: s.direccion
             } ); 
     
     
             if(result.affectedRows > 0){
                 res.flash('El usuario fue creado exitosamente')
                 return res.redirect('/admin');
             }else{
                 res.flash('Hubo un error al crear el cliente')
                 return res.redirect('/admin');
             }
         } catch (error) {
             next(error);
         }
 
     }



    static async handleUpdateUser(req, res, next){
        const {nombre, email, password, direccion} = req.body;

        const idCustomer = req.params.id;
        
        if(!idCustomer || isNaN(idCustomer)){
            const err = new Error('Id de cliente no encontrado');
            err.status = 404;
            return next(err);
        }

        try {
            
            const customerExist = await MasterModel.selectByField('customers', 'id', idCustomer);
            
            if(customerExist === 0){
                const err = new Error('El cliente no existe');
                err.status = 404;
                return next(err);
            }

            const {errors, s} = validateInput(nombre, email, password, direccion);

            const emailExists = await MasterModel.selectByFieldExcludingId('customers', 'email', email, idCustomer, 'email');

            if(emailExists && emailExists.length !== 0){
                errors.push({msg: "El email ya esta en uso", type: "danger"});
            }

            console.log("Errors",errors);

            if(errors.length > 0){
                return res.render('index/updateUser',{
                    title: "Actualizar Usuario",
                    errors,
                    customer: {
                        nombre: customerExist[0].nombre,
                        email: customerExist[0].email,
                        password: customerExist[0].password,
                        direccion: customerExist[0].direccion,
                    }
                });
            }

            const result = await MasterModel.update('customers',{ 
                nombre: s.nombre,
                email: s.email,
                password: s.password,
                direccion: s.direccion

            }, 'id', idCustomer);

            if(result.affectedRows > 0){
                res.flash('succes', 'El cliente fue actualizado correctamante');
                return res.redirect('/admin');
            }else{
                res.flash('error', 'Hubo un error al actualizar el cliente');
                return res.redirect('/admin');
            }

        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next){
        const idCustomer = req.params.id

        console.log(idCustomer);
        
        
        
        if(!idCustomer || isNaN(idCustomer)){
            const err = new Error('Id de cliente no encontrado');
            err.status = 404;
            return next(err);
        }

        try {
            const customerExists = await MasterModel.selectByField('customers', 'id', idCustomer);

            if(customerExists.length === 0){
                const err = new Error('Id de cliente no encontrado');
                err.status = 404;
                return next(err);
            }
             
            if(customerExists[0].id !== parseInt(idCustomer)){
                const err = new Error('No estas autorizado');
                err.status = 403;
                return next(err);
            }

            const deleteCustomer = await MasterModel.delete('customers', 'id', idCustomer);

            if(deleteCustomer.affectedRows > 0){
                res.flash('succes', 'El cliente fue eliminado correctamante');
                return res.redirect('/admin')
            }else{
                res.flash('error', 'Hubo un error al eliminar el cliente');
                return res.redirect('/admin')
            }



        } catch (error) {
            next(error)
        }
    }

}

export default usersController;