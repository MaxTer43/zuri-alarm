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
    const unsplashAPI = environment.UNSPLASH_API_KEY;
    const unitId = parseInt(String(environment.UNIT_ID));

    try {
      const cameraResponse = await axios.get(unsplashAPI + "/camera");
      const data = cameraResponse.status === 200 ? cameraResponse.data : {};

      const tracking_links = Array.isArray(data.result)
        ? data.result
          .filter((camera: { unitId: number }) => camera.unitId === unitId)
          .map((camera: { location: string }) => camera.location)
        : [];
      let links = tracking_links.join(" "); // Concatena todos los enlaces

      const formData = new FormData();
      formData.append("address", "DENTRO DEL BUS");
      formData.append("incident", "");
      formData.append("tracking_link", links.toString());
      formData.append("unit_id", String(environment.UNIT_ID));

      const response = await axios.post(unsplashAPI + "/report/upload/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      this.alarmImage = this.defaultImage;
    }, 5 * 60 * 1000); // 5 minutos
  }
}
