import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Author } from '../author.model';
import { AuthorService } from '../author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  originalAuthor: Author;
  author: Author;
  editMode: boolean = false;
  id: string;

  constructor(private authorService: AuthorService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.authorService.getAuthor(this.id)
        .subscribe(authorData => {
          this.originalAuthor = authorData.author;
          if (!this.originalAuthor) {
            return;
          }
    
          this.editMode = true;
          this.author = JSON.parse(JSON.stringify(this.originalAuthor));
    
        });
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newAuthor = new Author(
      '',
      value.name,
      value.book,
      value.imageUrl
    );

    if (this.editMode) {
      this.authorService.updateAuthor(this.originalAuthor, newAuthor);
    }
    else {
      this.authorService.addAuthor(newAuthor);
    }

    this.router.navigate(['/authors']);
  }



  onCancel() {
    this.router.navigate(['/authors']);
  }

  

  isInvalidAuthor(newAuthor: Author) {
    if (!newAuthor) {
      return true;
    }

    if (this.author && newAuthor._id === this.author._id) {
      return true;
    }
    return false;
  }


}

