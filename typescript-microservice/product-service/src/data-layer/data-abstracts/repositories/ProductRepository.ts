
import { Model } from "mongoose";
import { MongooseAccess } from "../../../data-layer/adapters/MongoAccess";
import { ProductDocument } from "./ProductDocument";
import { ProductSchema } from "../../../data-layer/data-abstracts/repositories/ProductSchema";

export type ProductModel = Model<ProductDocument>;

export const ProductRepository:ProductModel = MongooseAccess.mongooseConnection.model<ProductDocument>("product", ProductSchema);

