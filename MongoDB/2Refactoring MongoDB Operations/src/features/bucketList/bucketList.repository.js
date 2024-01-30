// Please don't change the pre-written code
// Import the necessary modules here
import { getDB } from "../../config/mongodb.js";


class BucketListRepository {
  async addBucketListItem(newItem) {
    // Write your code here
    const db = getDB();

    await db.collection("bucketListItems").insertOne(newItem);

    return newItem;
  }
  

  async findOneBucketListItem(title) {
    // Write your code here
    
    const db = getDB();

    const item = await db.collection("bucketListItems").findOne({ title });
    
    return item;
  }
}

export default BucketListRepository;
