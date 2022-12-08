import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from './author.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  authors: Author[] = [];
  authorListChangedEvent = new Subject<Author[]>();

  constructor(private http: HttpClient) {

   }

   sortAndSend() {
    this.authors.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.authorListChangedEvent.next(this.authors.slice());
  }

   addAuthor(author: Author) {
    if (!author) {
      return;
    }

    // make sure id of the new author is empty
    author._id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, author: Author }>('http://localhost:3000/authors',
      author,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new author to authors
          this.authors.push(responseData.author);
          this.sortAndSend();
        }
      );
  }

   deleteAuthor(author: Author) {
    if (!author) {
      return;
    }
  
    const pos = this.authors.findIndex(a => a._id === author._id);
  
    if (pos < 0) {
      return;
    }

    console.log(`http://localhost:3000/authors/${author._id}`);
    
  
    // delete from database
    this.http.delete('http://localhost:3000/authors/' + author._id)
      .subscribe(
        (response: Response) => {
          this.authors.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

   getAuthor(id: string) {
    console.log(`http://localhost:3000/authors/${id}`);
    
    return this.http.get<{ message: string, author: Author }>('http://localhost:3000/authors/' + id);
   }

   getAuthors() {
    this.http.get<{message: string, authors: Author[]}>('http://localhost:3000/authors').subscribe(
      (authorData) => {
        this.authors = authorData.authors;
        this.authors.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
        this.authorListChangedEvent.next(this.authors.slice());
      });
  
      (error: any) => {
        console.log(error);
      }
   }

   storeAuthors() {
    let authors = JSON.stringify(this.authors);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http
    .put("http://localhost:3000/authors", authors, {
      headers: headers,
    })
    .subscribe(() => {
      this.authorListChangedEvent.next(this.authors.slice());
    });
  }

  updateAuthor(originalAuthor: Author, newAuthor: Author) {
    if (!originalAuthor || !newAuthor) {
      return;
    }

    const pos = this.authors.findIndex(d => d._id === originalAuthor._id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newAuthor._id = originalAuthor._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/authors/' + originalAuthor._id,
    newAuthor, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.authors[pos] = newAuthor;
        this.sortAndSend();
      }
    );
}
}
