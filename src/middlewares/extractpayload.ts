import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
//first we check if user loged in and then extract payload
//if not it will go to the next middleware
interface userPayload{
    id:string;
    email:string;
}
declare global{
    namespace Express{
        interface Request{
            currentUser?:userPayload;
        }
    }
}
export const ExtractPayload=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.session?.jwt){
        return next()
    }
    try{
        const payload=jwt.verify(req.session.jwt,process.env.JWT_KEY!) as userPayload
        req.currentUser=payload
        return next()

    }catch(err){
        return next()
    }
}