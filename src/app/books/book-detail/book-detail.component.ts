import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
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
  nativeWindow: any;

  constructor(
      private bookService: BookService,
      private router: Router,
      private route: ActivatedRoute,
      private windRefService: WindRefService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.book = this.bookService.getBook(this.id);
      }
    );

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onDelete() {
    this.bookService.deleteBook(this.book);

    this.router.navigateByUrl('/books');
  }

  }

