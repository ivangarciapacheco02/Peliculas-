import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {
    // Si no existe la imagen, retornar la imagen predeterminada
    if (!img) {
      return '/assets/no-image-banner.jpg'; // Asegúrate de que esta ruta sea correcta
    }

    // Construcción de la URL de la imagen
    const imgUrl = `${URL}/${size}${img}`;
    return imgUrl;
  }
}
