const sanitizeIput = (input, typeInput) => {
    
    if(typeof input !== 'string'){
        return '';
    }

    if(typeInput === 'password'){
        return input.replace(/[^A-Za-z\d@$!%*?&\-+]/g,'')
    }else if(typeInput === 'precio'){
        return input.replace(/[^\d]/g, '')
    }else{
        return input.replace(/[^\w\s@.-]/g, '')
    }
}


export const validateInput = (nombre, email, password, direccion) => {
    const s = {
        email: sanitizeIput(email, 'email'),
        password: sanitizeIput(password, 'password'),
        nombre: sanitizeIput(nombre, 'nombre'),
        direccion: sanitizeIput(direccion, 'nombre') 
    }

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    


    const errors = []


    // Verifica que todos los campos de el formulario esten llenos
    if(!s.email || !s.password || !s.nombre || !s.direccion){
        errors.push({msg: "Todos los campos son requeridos", type: 'danger'})
    }

    // Verifica el formato del email
    if(!regexEmail.test(s.email)){
        errors.push({msg: "Email no válido", type: 'danger'}) 
    }


    return {errors, s}
    
}