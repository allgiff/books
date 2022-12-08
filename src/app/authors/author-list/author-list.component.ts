import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Author } from '../author.model';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  subsription: Subscription;
  term: string;

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
   this.subsription = this.authorService.authorListChangedEvent.subscribe(
    (authors: Author[]) => {
      this.authors = authors;
    }
   );

   this.authorService.getAuthors();
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}

