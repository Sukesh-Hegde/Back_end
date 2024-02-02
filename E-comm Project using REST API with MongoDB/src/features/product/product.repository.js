import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";


class ProductRepository{

    constructor(){
        this.collection = "products";
    }

    async add(newProduct){
        try{
            // 1. Get the database
          const db = getDB();
          // 2. Get the collection
          const collection = db.collection(this.collection);
          
          // 3. Insert the document.
          await collection.insertOne(newProduct);
          return newProduct;
          } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getAll(){
        try{
            // 1. Get the database
          const db = getDB();
          // 2. Get the collection
          const collection = db.collection(this.collection);
          
          // 3. Find the document.
          return await collection.find().toArray();
          } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(id){
        try{
            // 1. Get the database
          const db = getDB();
          // 2. Get the collection
          const collection = db.collection(this.collection);
          
          // 3. Find the document.
          return await collection.findOne({_id: new ObjectId(id)});
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    //using minPrice, maxPrice, category
    // async filter(minPrice, maxPrice, category){
    //     try{
    //       const db = getDB();
    //       const collection = db.collection(this.collection);
    //       let filterExpression = {};
    //       if(minPrice){
    //         filterExpression.price = {$gte: parseFloat(minPrice)}//mongoDB operator: gte=grater than equal to
    //       }
    //       if(maxPrice){
    //         filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)} //...filterExpression.price it avoid over-writing, it will extend the result
    //       }
    //       if(category){
    //         filterExpression.category=category;
    //         }          
    //       return await collection.find(filterExpression).toArray();// toArray=we are expecting to retuen more then one array
    //     } catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with database", 500);
    //     }
    // }


    // Product should have min price specified and category
    async filter(minPrice, categories){
        try{
            const db = getDB();
            const collection = db.collection(this.collection); 
            let filterExpression={};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            categories = JSON.parse(categories.replace(/'/g,'"'));
            if(categories){
                filterExpression={$or:[{category:{$in: categories}}, filterExpression]}
                // filterExpression.category=category
            }
            return collection.find(filterExpression).toArray();

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }


    // async rate(userID, productID, rating){
    //     try{
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         // 1. Find the product
    //         const product = await collection.findOne({_id:new ObjectId(productID)})
    //         // 2. Find the rating
           
    //         const userRating = await product?.ratings?.find(r=>r.userID==userID);
    //         if(userRating){
    //         // 3. Update the rating
    //         await collection.updateOne({
    //             _id: new ObjectId(productID), "ratings.userID": new ObjectId(userID)
    //         },{
    //             $set:{
    //                 "ratings.$.rating":rating
    //             }
    //         }
    //         );
    //         }else{
    //             await collection.updateOne({
    //                 _id:new ObjectId(productID)
    //             },{
    //                 $push: {ratings: {userID:new ObjectId(userID), rating}}
    //             })
    //         }
    //     }catch(err){
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong with database", 500);
    //     }
    // }

    async rate(userID, productID, rating){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            //Atomic expressions
            // 1. Removes existing entry
            await collection.updateOne({
                _id:new ObjectId(productID)
            },
            {
                $pull:{ratings:{userID: new ObjectId(userID)}}
            })
                 
            //2 add new entry
            await collection.updateOne({
                _id:new ObjectId(productID)
            },{
                $push: {ratings: {userID:new ObjectId(userID), rating}}
            })

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}
export default ProductRepository;