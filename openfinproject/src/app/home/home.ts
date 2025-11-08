import { Component } from '@angular/core';
import { OpenFinService } from '../openfinService';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',

  styleUrl: './home.css',
})
export class Home {
constructor(private openfin: OpenFinService) {}

  openDashboard() {
    this.openfin.openNewWindow('dashboard');
  }

}
