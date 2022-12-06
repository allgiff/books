import { Injectable } from "@angular/core";
import { Book } from "./book.model";
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class BookService {
    books: Book[] = [];
    bookListChangedEvent = new Subject<Book[]>();
    maxBookID: number;

    constructor(private http: HttpClient) { 
        this.maxBookID = this.getMaxId();
      }

getMaxId() {
    let maxId = 0;

    for (const book of this.books) {
      let currentId = parseInt(book._id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  sortAndSend() {
    this.books.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.bookListChangedEvent.next(this.books.slice());
  }

  addBook(book: Book) {
    if (!book) {
      return;
    }

    // make sure id of the new Book is empty
    book._id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, book: Book }>('http://localhost:3000/books/',
      book,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.books.push(responseData.book);
          this.sortAndSend();
        }
      );
  }

  deleteBook(book: Book) {

    if (!book) {
      return;
    }
  
    const pos = this.books.findIndex(b => b._id === book._id);
  
    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.http.delete('http://localhost:3000/books/' + book._id)
      .subscribe(
        (response: Response) => {
          this.books.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getBook(id: string): Book {
    return this.books.find((book) => book._id === id);
   }

  getBooks() {
    this.http.get<{message: string, books: Book[]}>('http://localhost:3000/books/').subscribe(
      (bookData) => {
        this.books = bookData.books;
        this.maxBookID = this.getMaxId();
        this.bookListChangedEvent.next(this.books.slice());
      });
  
      (error: any) => {
        console.log(error);
      }
  }

  storeBooks() {
    let books = JSON.stringify(this.books);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http
    .put("http://localhost:3000/books/", books, {
      headers: headers,
    })
    .subscribe(() => {
      this.bookListChangedEvent.next(this.books.slice());
    });
  }

  updateBook(originalBook: Book, newBook: Book) {
    if (!originalBook || !newBook) {
      return;
    }
  
    const pos = this.books.findIndex(d => d._id === originalBook._id);
  
    if (pos < 0) {
      return;
    }
  
    newBook._id = originalBook._id;
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('http://localhost:3000/books/' + originalBook._id,
      newBook, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.books[pos] = newBook;
          this.sortAndSend();
        }
      );
  }

}