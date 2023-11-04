import { Component } from '@angular/core';
import { Author, Book, DataService } from '../data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  author: Author = {} as Author;
  selectedBook: Book = {} as Book;
  showDialog: boolean = false; // A boolean flag indicating whether the book dialog is displayed.
  isAlphabetSort: boolean = true;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getAuthorBooks().subscribe((response: any) => {
      this.author = response.data;
    });
  }

  /**
   * Opens the book dialog for adding a new book.
   */
  addBook() {
    this.showDialog = true;
    this.selectedBook = {
      imageUrl: '',
      title: '',
      purchaseLink: '',
      PublishDate: '',
    };
  }

  /**
   * Deletes a book with the specified title from the author's collection of books.
   * @param bookTitle The title of the book to be deleted.
   */
  deleteBook(bookTitle: string) {
    let books = this.dataService.deleteBook(this.author.books, bookTitle);
    this.author.books = [...books];
    this.showDialog = false;
  }

  /**
   * Opens the book dialog for editing an existing book.
   * @param book The book to be edited.
   */
  editBook(book: Book) {
    this.showDialog = true;
    this.selectedBook = { ...book };
  }

  /**
   * Closes the book dialog and updates the author's book collection with a new or edited book if provided.
   * @param newBook The new or edited book to be added or updated.
   */
  closeDialog(newBook: Book) {
    this.showDialog = false;
    if (newBook) {
      this.selectedBook = newBook;
      const index = this.author.books.findIndex(
        (book) => book.title === newBook.title
      );
      if (index < 0) {
        this.author.books.push(newBook);
      } else {
        this.author.books[index] = newBook;
      }
      this.author.books = this.dataService.getSortedBooks(
        this.isAlphabetSort,
        this.author.books
      );
    }
  }

  /**
   * Toggles the sorting order of the author's books, either alphabetically or chronologically.
   */
  toggleSort() {
    this.isAlphabetSort = !this.isAlphabetSort;
    this.author.books = this.dataService.getSortedBooks(
      this.isAlphabetSort,
      this.author.books
    );
  }

  /**
   * Identifies items in the book list by their titles.
   * @param index The index of the item.
   * @param item The book item.
   * @returns The title of the book as an identifier.
   */
  identify(index: number, item: Book) {
    return item.title;
  }
}
