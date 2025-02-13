const sanitizeInput = (input, typeInput) => {
    
    if(typeof input !== 'string'){
        return '';
    }

    if (typeInput === 'nombre') {
        return input.replace(/[^A-Za-z\d@$!%*?&\-+]/g, '');
    } else if(typeInput === 'precio'){
        return input.replace(/[^\d]/g, '');
    }else if(typeInput === 'imagen'){
        return input.replace(/[^\w\s@:/.?=&%-]/g, '');
    }else{
        return input.replace(/[^\w\s@.-]/g, '');
    }
}


export const validateInput = (nombre, precio, imagen, descripcion) => {
    const s = {
        nombre: sanitizeInput(nombre, 'nombre'),
        precio: sanitizeInput(precio, 'precio'),
        imagen: sanitizeInput(imagen, 'imagen'),
        descripcion: sanitizeInput(descripcion, 'descripcion'),
    }    

    const errors = [];


    if(!s.nombre || !s.precio || !s.imagen || !s.descripcion){
        errors.push({
            msg: 'Todos los campos son obligatorios',
            type: 'danger'
        })
}

    return {errors, s}

};
