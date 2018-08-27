import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from './search.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from '../movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {

  @Output() newMovie = new EventEmitter<boolean>();

  constructor(
    private searchService: SearchService
  ) { }

  sub1: Subscription;
  sub2: Subscription;

  formGroup: FormGroup;
  ngOnInit() {
    this.formGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      year: new FormControl('',[ Validators.minLength(4), Validators.maxLength(4)]),
      plot: new FormControl('short')
    });
    this.sub1 = this.formGroup.get('title').valueChanges.subscribe(value => {
      this.search();
    })
    this.sub2 = this.formGroup.get('year').valueChanges.subscribe(value => {
      this.search();
    })
  }

  ngOnDestroy(){
    this.sub1? this.sub1.unsubscribe(): {};
    this.sub2? this.sub2.unsubscribe(): {};
  }

  movie: Movie;
  error: string;
  getMovies(title: string, year: string, plot: string){
    this.movie = null;
    this.error = '';
    this.searchService.getMovies(title, year, plot)
    .subscribe((movie: Movie) => {
      if (!movie['Error']){
        this.movie = movie;
      }
      else{
        this.error = movie['Error']
      }
    })
  }

  search(){
    this.formGroup.get('title').value? this.getMovies(this.formGroup.get('title').value, 
                                                      this.formGroup.get('year').value,
                                                      this.formGroup.get('plot').value
                                                    ):{};
  }

  addToList(){
    if (!this.isIncludeInStorage()){
      let list:any = this.getListFromStorage();
      if (list.length){
        list.push(this.movie);
        localStorage.setItem('movieList', JSON.stringify(list));
      }
      else {
        localStorage.setItem('movieList', JSON.stringify([this.movie]));
      }
      this.newMovie.emit();
    } 
  }

  getListFromStorage(): Movie[]{
    let list:any = localStorage.getItem('movieList');
    list? list = JSON.parse(list) as Movie[]: list = [];
    return list;
  }

  isIncludeInStorage(){
    let list = this.getListFromStorage();
    let flag = false;
    list.length? list.forEach(m => {
      m.Title === this.movie.Title && m.Year === this.movie.Year? flag = true: {};
    }): {};
    return flag;
  }
}
