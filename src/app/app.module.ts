import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule }   from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import { SearchMovieComponent } from './search-movie/search-movie.component';
import { MyMovieListComponent } from './my-movie-list/my-movie-list.component';
import { SearchService } from './search-movie/search.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatSelectModule,
        MatCardModule} from '@angular/material';
import { MovieComponent } from './movie/movie.component';

const appRoutes: Routes =[
  { path: 'movie', component: MovieComponent},
 /*  { path: '', component: SearchMovieComponent}, */
  { path: '', component: MyMovieListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchMovieComponent,
    MyMovieListComponent,
    MovieComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
