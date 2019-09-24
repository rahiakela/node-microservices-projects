import { ProductDocument } from "../data-abstracts/repositories/ProductDocument";
import { ProductRepository } from "../../data-layer/data-abstracts/repositories/ProductRepository";
import * as mongoose from 'mongoose';

export class ProductDataAgent{
    constructor(){}
    
    async createNewProduct(product:any):Promise<any>{
        let newProduct=<ProductDocument>(product);
        if(newProduct.id){
            let productObj=await ProductRepository.findOne({productId:newProduct.id});
            if(productObj && productObj.ownerId!=newProduct.ownerId){
                return {thrown:true,success:false,status:403,message:"you are not the owner of Product"}
            }
        }   
        let addUpdateProduct=await ProductRepository.create(newProduct);
        console.log(addUpdateProduct);
        if(addUpdateProduct.errors){
            return {thrown:true,success:false,status:422,message:"db is currently unable to process request"}
        }
        return addUpdateProduct;       
    }

    async getAllProducts():Promise<any>{

    }

    async getProductById(productId:string):Promise<any>{
        let objectId=mongoose.Types.ObjectId;
        if(!objectId.isValid(productId)){
            return {status:401, message: "incorrect product id"}
        }
        let result = await ProductRepository.findById(productId);
        if(result.errors){
            return {thrown:true,success:false,status:422,message:"db is currently unable to process request"}
        }
        return result;
    }

}