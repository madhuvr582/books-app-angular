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
  showDialog: boolean = false;
  isAlphabetSort: boolean = true;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getAuthorBooks().subscribe((response: any) => {
      this.author = response.data;
    });
  }

  addBook() {
    this.showDialog = true;
    this.selectedBook = {
      imageUrl: '',
      title: '',
      purchaseLink: '',
      PublishDate: '',
    };
  }
  deleteBook(bookTitle: string) {
    let books = this.dataService.deleteBook(this.author.books, bookTitle);
    this.author.books = [...books];
    this.showDialog = false;
  }
  editBook(book: Book) {
    this.showDialog = true;
    this.selectedBook = { ...book };
  }
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
  toggleSort() {
    this.isAlphabetSort = !this.isAlphabetSort;
    this.author.books = this.dataService.getSortedBooks(
      this.isAlphabetSort,
      this.author.books
    );
  }

  identify(index: number, item: Book) {
    return item.title;
  }
}
