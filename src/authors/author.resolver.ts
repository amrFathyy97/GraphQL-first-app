import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthorService } from "./author.service";
import { AuthorDto } from "./author.model";



@Resolver(of => AuthorDto)
export class AuthorResolver {
    constructor(private authorService: AuthorService){}
    @Query((returns) => [AuthorDto])
    async findAllAuthors(){
        return this.authorService.findAll()
    }

    @Query((returns) => AuthorDto)
    async findAuthorById(
        @Args({name: "authorId", type: () => String}) authorId: string
    ){
        return this.authorService.findOne(authorId)
    }
    
    @Mutation((returns) => AuthorDto)
    async createAuthor(@Args({name: "name", type: () => String}) name: string){
        return this.authorService.createAuthor(name)
    }
    
    @Mutation((returns) => AuthorDto)
    async updateAuthor(
        @Args({name: "authorId", type: () => String}) authorId: string,
        @Args({name: "AuthorName", type: () => String}) authorName: string
    ){
        return this.authorService.updateAuthor(authorId, authorName)
    }

    @Mutation((returns) => String)
    async deleteAuthor(
        @Args({name: "authorId", type: () => String}) authorId: string,
    ) {
        return this.authorService.deleteAuthor(authorId)
    }
}