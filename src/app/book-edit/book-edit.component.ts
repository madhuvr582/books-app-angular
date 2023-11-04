import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Book } from '../data.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent {
  @Input() book = {} as Book;
  @Input() showDialog: boolean | undefined;
  @Output() closeDialogEvent = new EventEmitter<Book>();
  title: string = '';

  ngOnInit() {
    console.log('book', this.book, this.showDialog);
  }

  closeDialog(book?: Book) {
    this.showDialog = false;
    if (this.title !== '' && book) {
      book.title = this.title;
    }
    this.title = '';
    this.closeDialogEvent.emit(book);
  }
}
