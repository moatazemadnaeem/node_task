import {Request,Response} from 'express'
import { BadReqErr } from '../errorsclasses/BadRequestError';
import { notfound } from '../errorsclasses/notfound';
import Product from '../models/productModel';
import User from '../models/userModel';
const errorReq=(title:string,price:number|string,image_url:string)=>{
    if((typeof(title)==='string'&&title.length<2)){
        throw new BadReqErr('Title must be at least 2 chars')
    }
    if((typeof(price)==='string'&&price.length===0)){
        throw new BadReqErr('Please provide valid price')
    }
    if((typeof(image_url)==='string'&&image_url.length<=0)){
        throw new BadReqErr('Please provide image url')
    }
}
const ProductController={
    create_product:async(req:Request,res:Response)=>{
        const {title,price,image_url}=req.body;
        const userId=req.currentUser?.id;
        const __price=parseFloat(price)
        try{
         const ExistingCurrentUser=await User.findById(userId)
         if(!ExistingCurrentUser){
            throw new notfound('User not found')
         }
         const product=await Product.create({userId,title,price:__price,image_url})
         return res.status(201).send({title:product.title,image_url:product.image_url,price:product.price,id:product.id,msg:'Product Created Successfully.'})
        }catch(err:any){
         throw new BadReqErr(err.message)
        }
    },
    edit_product:async(req:Request,res:Response)=>{
        const {title,price,image_url,productId}=req.body;
        const userId=req.currentUser?.id;
        const __price=parseFloat(price)
        try{
            const ExistingCurrentUser=await User.findById(userId)
            if(!ExistingCurrentUser){
               throw new notfound('User not found')
            }
            
            const product= await Product.findById(productId)
            if(!product){
                throw new notfound('Product not found')
            }

            errorReq(title,price,image_url)
           
            if(title&&title.length>=2){
                product.title=title;
            }
            if(price){
                product.price=__price
            }
            if(image_url&&image_url.length>0){
                product.image_url=image_url
            }

            await product.save()
            
            return res.status(200).send({title:product.title,image_url:product.image_url,price:product.price,id:product.id,msg:'Product Updated Successfully.'})
           }catch(err:any){
            throw new BadReqErr(err.message)
           }
    },
    delete_product:async(req:Request,res:Response)=>{
        const {productId}=req.body;
        const userId=req.currentUser?.id;
        try{
            const ExistingCurrentUser=await User.findById(userId)
            if(!ExistingCurrentUser){
               throw new notfound('User not found')
            }
            const product= await Product.findById(productId)
            if(!product){
                throw new notfound('Product not found')
            }
            product.delete();

            return res.status(200).send({msg:'Product Deleted Successfully.'})
           }catch(err:any){
            throw new BadReqErr(err.message)
           }
    }
}
export default ProductController