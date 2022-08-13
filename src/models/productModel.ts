import mongoose from 'mongoose'

interface ProductRes extends mongoose.Document{
    userId:string;
    title:string;
    price:number;
    image_url:string;
}
const productschema=new mongoose.Schema<ProductRes>({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image_url:{
        type:String,
        required:true
    },
   
},
{
    toJSON:{
        transform(doc,ret){
            ret.id=ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps:true
}
);

const Product=mongoose.model<ProductRes>('Product',productschema)

export default Product;
