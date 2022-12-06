import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() book: Book;

  books: Book[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
