import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@ObjectType()
export class AuthorDto {
    @Field()
    name: string
}


@Schema()
export class Author {
    @Prop({unique: true})
    name: string
}

export const AuthorSchema = SchemaFactory.createForClass(Author)