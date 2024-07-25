import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookDto } from './book.model';
import { BookService } from './book.service';

@Resolver((of) => BookDto)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query((returns) => [BookDto])
  async findAllBooks() {
    return this.bookService.findAll();
  }

  @Query((returns) => BookDto, {nullable: true})
  async findBookById(@Args({ name: 'id', type: () => String }) id: string) {
    return this.bookService.findOne(id);
  }

  @Mutation((returns) => BookDto)
  async createBook(
    @Args({ name: 'bookTitle', type: () => String }) bookTitle: string,
    @Args({ name: 'authorId', type: () => String }) authorId: string,
  ) {
    return (await this.bookService.createBook(bookTitle, authorId)).populate("author")
  }

  @Mutation((returns) => BookDto)
  async updateBook(
    @Args({name: "bookId", type: () => String}) bookId: string,
    @Args({name: "author", type: () => String, nullable: true}) author: string,
    @Args({name: "bookTitle", type: () => String}) bookTitle?: string,
  ){
    return this.bookService.updateBook(bookId, author,bookTitle)
  }

  @Mutation((returns) => String)
  async deleteBook(
    @Args({name: "bookId", type: () => String}) bookId: string,
  ){
    return this.bookService.deleteBook(bookId)
  }
}
