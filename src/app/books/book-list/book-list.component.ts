import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  subscription: Subscription;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.subscription = this.bookService.bookListChangedEvent.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );

    this.bookService.getBooks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

