import * as zod  from 'zod'

export const schema= zod.object({
  name : zod.string().nonempty('Name is required').min(3 , 'Min 3 Letters').max(8 , 'Max 8 Letters') ,
  email : zod.string().nonempty('Email Required').email('Inavlid Email') ,
  password : zod.string().nonempty('Password Required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , 'Invalid Password' ) ,
  rePassword:zod.string().nonempty('rePassword Required'),
  phone: zod.string().nonempty('Phone Required').regex(/^01[0125]\d{8}$/ , 'Invalid Phone' ) ,
}).refine((obj)=>{
  if(obj.password === obj.rePassword){
    return true
  }
  else{
    return false
  }
} , {path:['rePassword'] , message : 'password & rePassword not matched' })