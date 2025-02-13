const errorHandler = (err, req, res, next) => {

    const statusCode = err.status || 500;

    let message = err.message;

    if(statusCode === 404){
        message = "Recurso no encontrado."
    }else if(statusCode === 403){
        message = "Acceso prohibido"
    }else if(statusCode === 500){
        message = "Error interno del servidor."
    }

    res.status(statusCode).render('error/error',{
        title: `Error: ${statusCode}`,
        message: message,
        error: process.env.NODE_ENV === 'development' ? err : {}
    })

}

const notFound = (req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
}


export {
    errorHandler,
    notFound
}