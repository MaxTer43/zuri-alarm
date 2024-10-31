import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment.prod';
// @ts-ignore
import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule],
})
export class AppComponent {
  alarmImage: string = 'assets/alarm_image.png';
  private readonly defaultImage: string = 'assets/alarm_image.png';
  private readonly activeImage: string = 'assets/alarm_image2.png';


  async toggleImage() {
    if (this.alarmImage == this.activeImage) return;
    this.alarmImage = this.activeImage;
    const unsplashAPI= environment.UNSPLASH_API_KEY;
    const unitId= parseInt(String(environment.UNIT_ID));
    try {
      const cameraResponse = await axios.get(unsplashAPI + "/camera");
      const data = cameraResponse.status === 200 ? cameraResponse.data : {};

      const tracking_links = Array.isArray(data.result)
        ? data.result
          .filter((camera: { unitId: number }) => camera.unitId === unitId)
          .map((camera: { location: string }) => camera.location) // Obtener solo el atributo location
        : [];
      let links = tracking_links[0]
      if (tracking_links.length > 1){
        for (let i = 1; i < tracking_links.length; i++) {
          links += " " + tracking_links[i];
        }
      }
      const report = {
        "address": "Dentro del bus",
        "incident": "",
        "tracking_link": links.toString(),
        "unitId": environment.UNIT_ID,
      };
      const formData = new FormData();
      formData.append('data', JSON.stringify(report)); // Agregar los datos del reporte

      const response = await axios.post(unsplashAPI + "/report", report, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      this.alarmImage = this.defaultImage;
    }, 5 * 60 * 1000); // 5 minutos
  }
}
