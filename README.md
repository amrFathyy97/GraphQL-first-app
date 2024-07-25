## My First NestJS GraphQL Application

This is my first application built using NestJS and GraphQL. The application performs CRUD (Create, Read, Update, Delete) operations on two models: Authors and Books, using Mongoose for MongoDB interactions. The project follows the code-first approach for GraphQL schema development.


## Table of Contents

- Features
- Installation
- Usage
- Models
- GraphQL API
- Contributing
- License

## Installation

1. Clone the repository:

```bash
git clone https://github.com/amrFathyy97/GraphQL-first-app.git
cd GraphQL-first-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a .env file in the root directory and add your MongoDB connection string:

``` plaintext
DB_URI="your mongodb uri/${DB_NAME}"
DB_NAME="your mongo database name"
```

4. Run the application:

```bash
npm run start
```

## Usage

Once the application is running, you can access the GraphQL Playground at http://localhost:3002/graphql to interact with the GraphQL API.

## Models

### Author

The Author model represents a book author with the following fields:

- objectId: Unique identifier
- name: Name of the author

## Book

The Book model represents a book with the following fields:

- objectId: Unique identifier
- title: Title of the book
- author: Reference to the Author model


## GraphQL API

### Queries

```graphql
query { # Author Queries 
  findAllAuthors
  findAuthorById(authorId: "author's objectId")
}

query {
  findAllBooks,
  findBookById(bookId: "book's objectId", bookTitle: "book title", author: "author's objectId")
}

```

### mutations

```graphql
mutation { # Book mutations
  createBook(bookTitle: "your book title", authorId: "author's objectId")
  updateBook(bookId: "book objectId", bookTitle: "book title", author: "author's objectId"),
  deleteBook(BookId: "book objectId"),

}

mutation { # Author mutations
  createAuthor(name: "author's name"),
  updateAuthor(authorId: "author's objectId", AuthorName: "new author name"),
  deleteAuthor(authorId:"author's objectId")
}
```
