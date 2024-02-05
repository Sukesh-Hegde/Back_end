import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'


const booksModel = mongoose.model('books',bookSchema)
export default class BookRepository {


    // -----Change code in below functions only-----

    //book creation
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    //filtering the book by id
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }
    
}