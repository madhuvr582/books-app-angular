import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../data.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent {
  @Input() book = {} as Book;

  /**
   * Input property that indicates whether the dialog for editing the book details is displayed.
   */
  @Input() showDialog: boolean | undefined;

  /**
   * Output event emitter for closing the book edit dialog and optionally passing the edited book back.
   */
  @Output() closeDialogEvent = new EventEmitter<Book>();

  title: string = '';

  /**
   * Closes the book edit dialog, optionally updating the book's title.
   * @param book The book with updated details (if edited).
   */
  closeDialog(book?: Book) {
    this.showDialog = false;
    if (this.title !== '' && book) {
      book.title = this.title;
    }
    this.title = '';
    this.closeDialogEvent.emit(book);
  }
}
