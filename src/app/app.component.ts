import { Component, computed, Signal, signal } from '@angular/core';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { GeneralService } from './services/general.service';
@Component({
  selector: 'app-root',
  imports: [SidebarComponent, HeaderComponent, RouterOutlet, NgClass],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'bo-serasi';
  darkMode: Signal<boolean> = signal(false);

  constructor(private readonly generalService: GeneralService) {
    this.darkMode = computed(() => this.generalService.darkMode());
  }
}
