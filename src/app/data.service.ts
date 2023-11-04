import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Author {
  author: string;
  birthday: string;
  birthPlace: string;
  books: Book[];
}

export interface Book {
  imageUrl: string;
  title: string;
  purchaseLink: string;
  PublishDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = 'https://s3.amazonaws.com/api-fun/books.json';
  constructor(private http: HttpClient) {}

  getAuthorBooks(): Observable<any> {
    return this.http.get<Author>(this.url).pipe(
      map((response: any) => {
        response.data.books = response.data.books.sort((a: Book, b: Book) => {
          return a.title.localeCompare(b.title);
        });
        return response;
      })
    );
  }

  addBook(author: Author, book: Book) {
    author.books.push(book);
  }

  deleteBook(books: Book[], booktitle: string) {
    const book = books.find((a) => a.title === booktitle);
    if (book) {
      return books.filter((book) => book.title !== booktitle);
    }
    return books;
  }
  getSortedBooks(isAlphabetSort: boolean, books: Book[]) {
    return isAlphabetSort
      ? books.sort((a, b) => a.title.localeCompare(b.title))
      : books.sort(
          (a, b) =>
            new Date(a.PublishDate).getTime() -
            new Date(b.PublishDate).getTime()
        );
  }
}
