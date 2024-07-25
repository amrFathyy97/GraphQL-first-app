import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { Author, AuthorDto } from "src/authors/author.model";



@ObjectType()
export class BookDto {
    @Field()
    id: number
    @Field({nullable: true})
    title: string;
    @Field(type => AuthorDto)
    author: AuthorDto
}



@Schema()
export class Book {
    @Prop()
    title: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Author"})
    author: Author
}

export const BookSchema = SchemaFactory.createForClass(Book)