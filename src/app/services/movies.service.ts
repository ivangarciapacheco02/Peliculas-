import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula, RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: any[]=[];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string): Observable<T> {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getPopulares(): Observable<RespuestaMDB> {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  buscarPeliculas(texto: string): Observable<RespuestaMDB> {
    return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${texto}`);
  }

  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }
    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPeliculaDetalle(id: string): Observable<PeliculaDetalle> {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: string): Observable<RespuestaCredits> {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }




  cargarGeneros(): Promise<Genre[]> {
  return new Promise(resolve => {
    // Especificamos que la respuesta es un objeto con la propiedad 'genres' de tipo Genre[]
    this.ejecutarQuery<{ genres: Genre[] }>(`/genre/movie/list?a=1`)
      .subscribe(resp => {
        this.generos = resp.genres; // Accedemos directamente a 'genres'
        console.log(this.generos);
        resolve(this.generos); // Resolviendo la promesa con los géneros
      });
  });
}


}

