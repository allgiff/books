import { Injectable } from "@angular/core";
import { Book } from "./book.model";
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class BookService {
    books: Book[] = [
        new Book('', '1', 'Test Book', 'This is a book', 'https://via.placeholder.com/150'),
        new Book('', '2', 'Test Book', 'This is a book', 'https://via.placeholder.com/150')
      ];
    bookListChangedEvent = new Subject<Book[]>();
    maxBookID: number;

    constructor(private http: HttpClient) { 
        this.maxBookID = this.getMaxId();
      }

getBooks() {
return this.books.slice();
}

getMaxId() {
    let maxId = 0;

    for (const book of this.books) {
      let currentId = parseInt(book.id);

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
    book.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, book: Book }>('#',
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
  
    const pos = this.books.findIndex(b => b.id === book.id);
  
    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.http.delete('#' + book.id)
      .subscribe(
        (response: Response) => {
          this.books.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  getBook(id: string): Book {
    return this.books.find((book) => book.id === id);
   }

  getAllBooks() {
    this.http.get<{message: string, books: Book[]}>('#').subscribe(
      (bookData) => {
        this.books = bookData.books;
        this.maxBookID = this.getMaxId();
        this.books.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
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
    .put("#", books, {
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
  
    const pos = this.books.findIndex(d => d.id === originalBook.id);
  
    if (pos < 0) {
      return;
    }
  
    newBook.id = originalBook.id;
    newBook._id = originalBook._id;
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('#' + originalBook.id,
      newBook, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.books[pos] = newBook;
          this.sortAndSend();
        }
      );
  }

}