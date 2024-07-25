import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Author, AuthorSchema } from "./author.model";
import { AuthorService } from "./author.service";
import { AuthorResolver } from "./author.resolver";




@Module({
    imports: [MongooseModule.forFeature([{name: Author.name, schema: AuthorSchema}])],
    providers: [AuthorService, AuthorResolver]
})
export class AuthorModule {}