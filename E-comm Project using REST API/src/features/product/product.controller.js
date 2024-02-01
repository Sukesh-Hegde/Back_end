import ProductModel from "./product.model.js";
// static funtions are called directly by class name so we dont neet to add any instances

export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.getAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    //extracting data
    const { name, price, sizes } = req.body;
    //creating new product object
    const newProduct = {
      name,
      price: parseFloat(price),
      //split funtion will give array of those diff sizes
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord);
    //201 = created
  }

  rateProduct(req, res) {
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;
    // console.log(userID +"u"+productID +"p"+rating+"r");
    try {
      ProductModel.rateProduct(userID, productID, rating);
    } catch (err) {
      return res.status(400).send(err.message);
    }
    return res.status(200).send("Rating is added");
  }

  getOneProduct(req, res) {
    //using root parameters
    console.log(1);
    const id = req.params.id;
    console.log(id);
    const product = ProductModel.get(id);
    if (!product) {
      res.status(404).send("product not found");
    } else {
      return res.status(200).send(product);
    }
  }

  filterProducts(req, res) {
    //using query parametre

    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(result);
  }
}
