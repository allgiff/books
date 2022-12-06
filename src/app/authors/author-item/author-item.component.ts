import { Component, Input, OnInit } from '@angular/core';
import { Author } from '../author.model';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {
  
  @Input() author: Author;

  authors: Author[] = [
    new Author('', '2', 'Test Author', 'This is a Author', 'https://via.placeholder.com/150'),
    new Author('', '2', 'Test Author', 'This is a Author', 'https://via.placeholder.com/150')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
