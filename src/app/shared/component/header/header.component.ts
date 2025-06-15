import { Component } from '@angular/core';
import { ClickOutsideDirective } from '../../directive/click-outside.directive';
import { NgOptimizedImage } from '@angular/common';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-header',
  imports: [ClickOutsideDirective, NgOptimizedImage],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  menuToggle = false;
  sidebarToggle = false;
  darkMode = false;
  dropdownNotificationOpen = false;
  dropdownProfileOpen = false;
  notifying = true;

  constructor(private readonly generalService: GeneralService) {}

  handleSidebar(event: Event) {
    event.stopPropagation();
    this.sidebarToggle = !this.sidebarToggle;
    this.generalService.sidebarToggle.set(this.sidebarToggle);
  }

  handleDarkMode(event: Event) {
    event.stopPropagation();
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkmode', this.darkMode.toString());
    this.generalService.darkMode.set(this.darkMode);
  }

  handleMenuToggle(event: Event) {
    event.stopPropagation();
    this.menuToggle = !this.menuToggle;
  }

  openDropdown(event: Event, dropdown: string) {
    event.preventDefault();
    event.stopPropagation();
    if (dropdown === 'notification') {
      this.dropdownNotificationOpen = !this.dropdownNotificationOpen;
    } else if (dropdown === 'profile') {
      this.dropdownProfileOpen = !this.dropdownProfileOpen;
    }
  }
}
