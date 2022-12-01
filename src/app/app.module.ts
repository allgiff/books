import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { HeaderComponent } from './header/header.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookItemComponent } from './books/book-item/book-item.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorItemComponent } from './authors/author-item/author-item.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorsComponent,
    HeaderComponent,
    BookListComponent,
    BookItemComponent,
    BookDetailComponent,
    BookEditComponent,
    AuthorListComponent,
    AuthorItemComponent,
    AuthorDetailComponent,
    AuthorEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
