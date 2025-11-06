import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() id!: string;

  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];

  estrella = 'star-outline';
  existe: boolean = false;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };

  constructor(
    private movieService: MoviesService,
    private modalCtr: ModalController,
    private dataLocal: DataLocalService
  ) { }

  ngOnInit(): void {
    this.dataLocal.existePelicula( this.id )
      .then( existe => this.estrella = ( existe ) ? 'star' : 'star-outline' );


    this.movieService.getPeliculaDetalle(this.id).subscribe(resp => {
      console.log(resp);
      this.pelicula = resp;
    });

    this.movieService.getActoresPelicula(this.id).subscribe(resp => {
      console.log(resp);
      this.actores = resp.cast;
    });
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula( this.pelicula );
    this.estrella = ( existe ) ? 'star' : 'star-outline';
  }


  regresar() {
    this.modalCtr.dismiss();
  }
}
