import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment.prod';

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

  toggleImage() {
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

    console.log(environment.API_KEY);
    // Realiza la solicitud POST
    fetch(environment.API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));

    setTimeout(() => {
      this.alarmImage = this.defaultImage;
    }, 5 * 60 * 1000); // 5 minutos
  }
}
