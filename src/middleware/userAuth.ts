export const userAuth = (req, res, next) =>{
    if (req.decode.role === 'user') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}