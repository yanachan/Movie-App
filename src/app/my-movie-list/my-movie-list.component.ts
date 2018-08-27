import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'my-movie-list',
  templateUrl: './my-movie-list.component.html',
  styleUrls: ['./my-movie-list.component.css']
})
export class MyMovieListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.setMovieList();
  }

  setMovieList(){
    this.movieList = this.getListFromStorage();
  }

  movieList: Movie[];
  getListFromStorage(): Movie[]{
    let list:any = localStorage.getItem('movieList');
    list? list = JSON.parse(list) : list = [];
    return list;
  }

  deleteMovie(ind: number){
    this.movieList.splice(ind,1);
    localStorage.setItem('movieList', JSON.stringify(this.movieList));
  }

}
