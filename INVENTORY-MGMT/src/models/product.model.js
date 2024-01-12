

export default class ProductModel{

    constructor(_id,_name,_desc,_price,_image){
        this.id=_id;
        this.name=_name;
        this.desc=_desc;
        this.price=_price;
        this.image=_image;
    }

    //create a static method which will return product
    static get(){
        return products;
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
