import { Injectable } from "@angular/core";
import { Book } from "./book.model";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BookService {
    private books: Book[] = [
        new Book('1', 'Test Book', 'This is a book', 'https://via.placeholder.com/150'),
        new Book('2', 'Test Book', 'This is a book', 'https://via.placeholder.com/150')
      ];

getBooks() {
return this.books.slice();
}
}