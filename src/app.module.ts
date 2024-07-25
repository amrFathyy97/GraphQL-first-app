import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig, dbEnv } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './books/book.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorModule } from './authors/author.module';

@Module({
  imports: [AuthorModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    BookModule,
    MongooseModule.forRootAsync({
      useClass: DatabaseConfig,
      imports: [
        ConfigModule.forRoot({
          load: [dbEnv],
          expandVariables: true,
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
