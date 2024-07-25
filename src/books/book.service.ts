import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.model';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createBook(title: string, authorId: string) {
    const createdBook = await this.bookModel.create({
      title,
      author: authorId,
    });
    await createdBook.save();
    return createdBook;
  }
  async findAll() {
    const books = await this.bookModel.find().populate('author');
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookModel.findOne({ _id: id }).populate('author');
    if (!book) throw new NotFoundException();
    return book;
  }

  async updateBook(id: string, author: string, title?: string) {
    const targetAuthor = this.bookModel.findOne({ _id: id });
    if (!targetAuthor) throw new NotFoundException();
    return await this.bookModel
      .findOneAndUpdate({ _id: id }, { title, author }, { new: true })
      .populate('author');
  }

  async deleteBook(id: string) {
    const targetBook = await this.bookModel.findOne({ _id: id });
    if (!targetBook) throw new NotFoundException();
    await this.bookModel.deleteOne({ _id: id });
    return 'Book deleted successfully';
  }
}
