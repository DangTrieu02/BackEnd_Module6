<<<<<<< HEAD
export const SECRET = '123456';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    let authorization = req.headers.authorization;
    if (authorization) {
=======
import jwt from 'jsonwebtoken';

export const SECRET = '12456'
export const auth = (req, res, next) => {
    let authorization = req.headers.authorization;
    if (authorization) {
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOjIsInVzZXJuYW1lIjoicm9vdCIsInBhc3N3b3JkIjoiJDJiJDEwJFdFTWNId0ZKM1k5QVNDUVJqNkhhQU9qRlhBa2pReEFhcFdNTzF0VDhZMExxL2dCTlV0SGouIiwiaWF0IjoxNjgzMTcwMzI4LCJleHAiOjE3MTkxNzAzMjh9.Bx8_gsAKn8hdorxrZnXnjBOUoINL1-Xtcxt3C1u2MXo
>>>>>>> origin/feature/change-password
        let accessToken = req.headers.authorization.split(' ')[1];
        if (accessToken) {
            jwt.verify(accessToken, SECRET, (err, payload) => {
                if (err) {
                    res.status(401).json({
<<<<<<< HEAD
                        message: 'err 401'
                    })
                } else {
                    req.decoded = payload;
=======
                        error: err.message,
                        message: 'You are anonymous 1'
                    })
                } else {
                    req.decode = payload;
>>>>>>> origin/feature/change-password
                    next();
                }
            })
        } else {
            res.status(401).json({
<<<<<<< HEAD
                message: 'not accessToken'
=======
                message: 'You are anonymous 2'
>>>>>>> origin/feature/change-password
            })
        }
    } else {
        res.status(401).json({
<<<<<<< HEAD
            message: 'who are you'
=======
            message: 'You are anonymous 3'
>>>>>>> origin/feature/change-password
        })
    }
}