import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  //standalone: false,
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[]=[];
  populares: Pelicula[]=[];



  constructor( private movieService: MoviesService) {

  }
  ngOnInit(): any {
      this.movieService.getFeature()
      .subscribe(resp =>{
        this.peliculasRecientes=resp.results;
      });
      this.getPopulares();
  }
  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.movieService.getPopulares()
    .subscribe(resp => {
      // console.log('Populares', resp.results);
      // this.populares.push( ...resp.results );

      const arrTemp = [ ...this.populares, ...resp.results];
      this.populares=arrTemp;
    });
  }

}
