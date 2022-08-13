import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { NotAuth } from '../errorsclasses/notAuth'
export const logedin=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.currentUser){
        throw new NotAuth('You are not loged In ')
    }
   next()
}