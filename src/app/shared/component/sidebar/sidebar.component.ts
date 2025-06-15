import { Component, computed, Signal, signal } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  sidebarToggle: Signal<boolean> = signal(true);
  selected = 'Dashboard';
  page = '';

  constructor(private readonly generalService: GeneralService) {
    this.sidebarToggle = computed(() => this.generalService.sidebarToggle());
  }

  selectPage(section: string, page: string) {
    this.selected = section;
    this.page = page;
  }
}
