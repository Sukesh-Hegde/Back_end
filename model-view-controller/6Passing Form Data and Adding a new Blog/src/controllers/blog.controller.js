// Please don't change the pre-written code
// Import the necessary modules here
import {blogs} from '../models/blog.model.js'

export const renderBlogs = (req, res) => {
  // Write your code here
  // console.log(products);
  //sending the product from server to client
  res.render("blogs",{products:blogs})
};
export const renderBlogForm = (req, res) => {
  // Write your code here
  res.render('addBlogForm');
};

export const addBlog = (req, res) => {
  // Write your code here
  blogs.push(req.body);
  res.render("blogs",{products:blogs})
};
