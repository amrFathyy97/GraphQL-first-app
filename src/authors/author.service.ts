import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './author.model';
import { Model } from 'mongoose';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async createAuthor(name: string) {
      const createdAuthor = await this.authorModel.create({ name });
      await createdAuthor.save();
      return createdAuthor;
  }
  async findAll() {
    const authors = await this.authorModel.find();
    return authors;
  }

  async findOne(id: string) {
      const author = await this.findOne(id);
      if (!author) throw new NotFoundException();
      return author;
  }

  async updateAuthor(id: string, name: string) {
    const targetAuthor = await this.authorModel.findOne({ _id: id });
    if (!targetAuthor) throw new NotFoundException();
    const updatedAuthor = await this.authorModel.findByIdAndUpdate(id, {
      name,
    },{new: true})
    await updatedAuthor.save();
    return updatedAuthor;
  }

  async deleteAuthor(id: string) {
        const targetAuthor = await this.authorModel.findOne({ _id: id });
        if (!targetAuthor) throw new NotFoundException();
        await this.authorModel.deleteOne({ _id: id });
        return "Author deleted successfully" 
  }
}
