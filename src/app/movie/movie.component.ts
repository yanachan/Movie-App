import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movie-component',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  movie: Movie;
  ngOnInit() {
    let list: any = localStorage.getItem('movieList');
    this.route.queryParams.subscribe(params => {
      list? list = JSON.parse(list): list = [];
      list.forEach(m => {
        m.Title === params['Title'] && m.Year === params['Year']? this.movie = m as Movie: {};
      })
    })
  }

  getKeys(movie: Movie){
    return Object.keys(movie);
  }
}
