import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultComponent } from './admin/default/default.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DefaultComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LTA';
}
