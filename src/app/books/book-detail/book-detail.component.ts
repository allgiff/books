import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  id: string;

  constructor(
      private bookService: BookService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.bookService.getBook(this.id);

        //TEMP
        console.log(this.book);
      }
    );
  }

  onDelete() {
    this.bookService.deleteBook(this.book);

    this.router.navigateByUrl('/books');
  }

  }

