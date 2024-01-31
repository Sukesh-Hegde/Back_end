import ExpenseRepository from "./expense.repository.js";
import ExpenseModel from "./expense.model.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try{
      const { title, amount, date, isRecurring, tags } = req.body;
      const expense = new ExpenseModel(title, amount, date, isRecurring, tags);
      console.log(expense);

      const createdexpense = await this.expenseRepository.addExpense(expense);
      console.log(createdexpense);
      res.status(201).send(createdexpense);
    }catch(err){
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try{
      const id = req.params.id;
      const expense = await this.expenseRepository.getOne(id);
      if (!expense) {
        res.status(404).send('Product not found');
      } else {
        return res.status(200).send(expense);
      }
    } catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
  }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try{
    const expenses = await this.expenseRepository.getAllExpenses();
    res.status(200).send(expenses);
    } catch(err){
    console.log(err);
    return res.status(200).send("Something went wrong");
   }    
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try{
      const productID = req.params.id;
      const tag = req.body.tag;
      this.expenseRepository.addTagToExpense(
        productID, 
        tag
        );
        return res
          .status(200)
          .send('Tag added sucessfully');
    } catch(err){
      console.log("Passing error to middleware");
      next(err);
    }
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    try{
      const expenses = await this.expenseRepository.filterExpenses(req.query);
      res.status(200).send(expenses);
      }catch(err){
        console.log(err);
        return res.status(200).send("Something went wrong");
      }
      
    }
}





// const minAmount = req.query.minAmount;
//       const maxAmount = req.query.maxAmount;
//       const isRecurring = req.query.isRecurring;
//       console.log(req.query);
//       const result = await this.expenseRepository.filterExpenses(
//         minAmount,
//         maxAmount,
//         isRecurring;
      // res.status(200).send(result);