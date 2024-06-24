import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment.prod';
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
    const report = {
      Id: 0,
      DateTime: new Date().toISOString(), // Asegúrate de tener la fecha y hora correctas
      Address: "Dentro del bus",
      Incident: "Alarma en unidad 1",
      TrackingLink: "https://maps.app.goo.gl/PsJQiVvKxLcFXiEM9",
      Image: "Imagen"
    };

    const apiUrl = environment.apiUrl;
    try {
      const response = await axios.post(apiUrl, report, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      this.alarmImage = this.defaultImage;
    }, 5 * 60 * 1000); // 5 minutos
  }
}
