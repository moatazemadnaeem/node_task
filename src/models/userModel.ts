import mongoose from 'mongoose'

interface UserRes extends mongoose.Document{
    name:string;
    email:string;
    password:string;
}
const userschema=new mongoose.Schema<UserRes>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
   
},
{
    toJSON:{
        transform(doc,ret){
            ret.id=ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps:true
}
);

const User=mongoose.model<UserRes>('User',userschema)

export default User;
