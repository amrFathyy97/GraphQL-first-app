import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookResolver } from "./book.resolvers";
import { MongooseModule } from "@nestjs/mongoose";
import { Book, BookSchema } from "./book.model";



@Module({
    providers: [BookService, BookResolver],
    imports: [MongooseModule.forFeature([{name: Book.name, schema: BookSchema}])]
})
export class BookModule {}