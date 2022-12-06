import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Author } from '../author.model';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  author: Author;
  id: string;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.authorService.getAuthor(this.id)
          .subscribe(authorData => {
            this.author = authorData.author;
          });
      }
    );
  }

  onDelete() {
    this.authorService.deleteAuthor(this.author);

    this.router.navigateByUrl('/authors');
  }

}
