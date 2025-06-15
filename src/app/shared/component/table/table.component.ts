/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, ElementRef, input, OnInit, ViewChild } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { RangePipe } from '../../pipe/range.pipe';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ClickOutsideDirective } from '../../directive/click-outside.directive';
import { TableHeader } from './table-interface';

export interface dataShowAttributes {
  page: number;
  keyword: string;
}

@Component({
  selector: 'app-tabel',
  imports: [BadgeComponent, RangePipe, NgClass, NgTemplateOutlet, ClickOutsideDirective],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  title = input<string>('List Data');
  headers = input<TableHeader[]>([]);
  dataTable = input<any[]>([]);
  totalData = input<number>(0);

  totalPages = 1;
  currentPage = 1;
  openMorePages = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  ngOnInit() {
    if (this.totalData() % 10 !== 0) {
      this.totalPages = Math.floor(this.totalData() / 10) + 1;
    } else {
      this.totalPages = this.totalData() / 10;
    }
  }

  onChangePage(event: Event, page: number) {
    event.preventDefault();
    this.currentPage = page;
  }

  onOpenMorePages(event: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.openMorePages = !this.openMorePages;
    setTimeout(() => this.scrollToActivePage());
  }

  scrollToActivePage() {
    const activeEl = document.getElementById('page-' + this.currentPage);
    const container = this.scrollContainer?.nativeElement;

    if (activeEl && container) {
      const offsetLeft = activeEl.offsetLeft;
      const elWidth = activeEl.offsetWidth;
      const containerWidth = container.offsetWidth;

      // Scroll active page to center
      container.scrollLeft = offsetLeft - containerWidth / 2 + elWidth / 2;
    }
  }
}
