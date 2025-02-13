const methodOverride = (req, res, next) => {
    
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
       
        const originalMethod = req.body;

        req.method = req.body._method.toUpperCase();

        delete req.body._method;

        console.log(`Method override ${originalMethod} to ${req.method}`)
    }

    next();
}

export default methodOverride;