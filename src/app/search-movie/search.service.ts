import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService{
  constructor(
    private http: HttpClient
  ){}

  getMovies(title: string, year: string, plot: string){
    return this.http.get('http://www.omdbapi.com/?apikey=634bc834&t=' + title + (year? '&y=' + year:'')  + '&plot=' + plot);
  }
}