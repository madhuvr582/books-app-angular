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

  /**
   * Retrieves an Observable of Author's books sorted alphabetically by title.
   * @returns An Observable containing the Author's books sorted alphabetically.
   */
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

  /**
   * Deletes a book with the specified title from a collection of books.
   * @param books The array of Book objects to search within.
   * @param bookTitle The title of the book to delete.
   * @returns An array of Book objects after deleting the specified book.
   */
  deleteBook(books: Book[], booktitle: string) {
    const book = books.find((a) => a.title === booktitle);
    if (book) {
      return books.filter((book) => book.title !== booktitle);
    }
    return books;
  }
  /**
   * Sorts an array of books either alphabetically by title or chronologically by publication date.
   * @param isAlphabetSort A boolean flag to indicate whether to sort alphabetically or chronologically.
   * @param books The array of Book objects to sort.
   * @returns An array of sorted Book objects based on the specified sorting criteria.
   */
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
