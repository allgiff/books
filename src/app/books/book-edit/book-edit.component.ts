import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  originalBook: Book;
  book: Book;
  editMode: boolean = false;
  id: string;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) {

   }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalBook = this.bookService.getBook(this.id);

      if(!this.originalBook) {
        return;
      }

      this.editMode = true;
      this.book = JSON.parse(JSON.stringify(this.originalBook));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newBook = new Book(
      '',
      value.name,
      value.description,
      value.url,
    );

    if (this.editMode) {
      this.bookService.updateBook(this.originalBook, newBook);
    }
    else {
      this.bookService.addBook(newBook);
    }

    this.router.navigate(['/books']);
  }

  onCancel() {
    this.router.navigate(['/books']);
  }
}
