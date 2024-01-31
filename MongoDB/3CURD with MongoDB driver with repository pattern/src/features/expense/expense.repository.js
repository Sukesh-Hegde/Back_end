import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      await collection.insertOne(expense);
      return expense;
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  // Get one expnese by its ID
  async getOne(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  // Get all expenses
  async getAllExpenses() {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      return await collection.find().toArray();
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    console.log(id,tag);
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      collection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $push: { tags: tag },
        }
      );
    } catch (err) {
      console.log("Something went wrong");
    }
  }
  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    console.log(criteria);
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      let filterExpression = {};
      if (criteria.minAmount || criteria.maxAmount) {
        if (criteria.minAmount) {
          filterExpression.amount = {$gte: parseFloat(criteria.minAmount)}
          // filterExpression.amount.$gte = parseFloat(criteria.minAmount);
        }
        if (criteria.maxAmount) {
          filterExpression.amount = {...filterExpression.amount, $lte: parseFloat(criteria.maxAmount)} //...filterExpression.price it acoid over-writing, it will extend the result
          // filterExpression.amount.$lte = parseFloat(criteria.maxAmount);
        }
      }
      if (criteria.isRecurring != undefined) {
        filterExpression.isRecurring = criteria.isRecurring === "true";
      }
      // return await collection.find(filterExpression).toArray(); // toArray=we are expecting to return more then one array
      const expenses = await collection.find(filterExpression).toArray();
      return expenses;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}

export default ExpenseRepository;
