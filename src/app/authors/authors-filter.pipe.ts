import { Pipe, PipeTransform } from '@angular/core';
import { Author } from './author.model';

@Pipe({
  name: 'authorsFilter',
  pure: false
})
export class AuthorsFilterPipe implements PipeTransform {

  transform(authors: Author[], term: string): any{
    let filteredAuthor: Author[] =[];  
    if (term && term.length > 0) {
       filteredAuthor = authors.filter(
          (author:Author) => author.name.toLowerCase().includes(term.toLowerCase())
       );
    }
    return filteredAuthor.length > 0 ? filteredAuthor : authors;
  }

}
