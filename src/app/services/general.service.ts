import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  sidebarToggle = signal(false);
  darkMode = signal(false);

  constructor() {
    this.darkMode.set(localStorage.getItem('darkmode') === 'true');
  }
}
