

export default class ProductModel{

    constructor(id,name,desc,price,imageUrl){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
    }

    //create a static method which will return product
    static getAll(){
        return products;
    }

    //update products
    static update(productObj) {
      const index = products.findIndex(
        (p) => p.id == productObj.id
      );
      products[index] = productObj;
    }

    static add(productObj){
      let newProduct = new ProductModel(
        //for id
        products.length+1,
        productObj.name,
        productObj.desc,
        productObj.price,
        productObj.imageUrl,
      )
      //pushing new product to the array
      products.push(newProduct)
    }

  //function to check an array whether perticular id is present or not
  static getById(id){
    return products.find((p)=> p.id == id);
  }

}
var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    ),
  ]
