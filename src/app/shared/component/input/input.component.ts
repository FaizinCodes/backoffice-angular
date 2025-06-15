/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars*/

import {
  Component,
  forwardRef,
  input,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../directive/click-outside.directive';
import { format, isValid, parse } from 'date-fns';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ClickOutsideDirective],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit {
  type = input<'text' | 'date' | 'file' | 'textarea' | 'checkbox' | 'radio' | 'select' | 'toggle'>(
    'text'
  );
  formControl = input<FormControl>(new FormControl());
  id = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  hint = input<string>('');
  errorMessage = input<string>('');
  valueCheckbox = input<boolean>(false);
  valueSelect = input<string>('');
  options = input<string[]>([]);
  formatDate = input<string>('dd/MM/yyyy');

  defaultFormControl = new FormControl();
  value: string | number | boolean = '';
  disabled = false;
  selectedOption = '';
  dropdownOpen = false;

  showDatepicker = false;
  selectedDate: Date | null = null;

  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  calendarDays: (Date | null)[] = [];
  years: number[] = [];
  calendarToday = '';
  previousValueDate = '';

  @ViewChildren('listMonth') listMonthDivs!: QueryList<ElementRef>;
  @ViewChildren('listYear') listYearDivs!: QueryList<ElementRef>;

  scrollAnimationId = 0;
  showListMonth = false;
  showListYear = false;

  get control() {
    return this.formControl || this.defaultFormControl;
  }

  ngOnInit() {
    if (this.type() === 'date') {
      this.generateYears(1970, 2100);

      const rawValue = this.formControl().value;
      if (rawValue) {
        this.setDateFormatDefault(rawValue);
      } else {
        this.setCalendarToday();
      }
      this.calendarToday = this.formatWithIntl(new Date());
      this.generateCalendar();
    }
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (this.type() === 'checkbox') {
      this.value = input.checked;
    } else {
      this.value = input.value;
    }

    this.onChange(this.value);
  }

  onCheckboxChange(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.control().enabled) {
      this.control().setValue(!this.control().value);
    }
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    setTimeout(() => (this.dropdownOpen = false), 50); // delay to allow click
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.dropdownOpen = false;
    this.control().setValue(option);
    this.onChange(option);
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const days: (Date | null)[] = [];

    // Padding awal
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    // Tanggal bulan ini
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(this.currentYear, this.currentMonth, d));
    }
    this.calendarDays = days;
  }

  prevMonth(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
    this.stopScrollAnimation();
  }

  nextMonth(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
    this.stopScrollAnimation();
  }

  prevYear(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.currentYear === this.years[0]) {
      this.currentYear = this.years[this.years.length - 1];
    } else {
      this.currentYear--;
    }
    this.generateCalendar();
    this.stopScrollAnimation();
  }

  nextYear(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.currentYear === this.years[this.years.length - 1]) {
      this.currentYear = this.years[0];
    } else {
      this.currentYear++;
    }
    this.generateCalendar();
    this.stopScrollAnimation();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    const formattedDate = format(date, this.formatDate());
    this.control().setValue(formattedDate);
    this.showDatepicker = false;
  }

  isSelected(date: Date) {
    return (
      this.selectedDate &&
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  showDatepickerModal() {
    this.showDatepicker = true;
  }

  generateYears(start: number, end: number) {
    this.years = [];
    for (let y = start; y <= end; y++) {
      this.years.push(y);
    }
  }

  selectMonth(month: string) {
    this.currentMonth = this.monthNames.indexOf(month);
    this.generateCalendar();
    this.showListMonth = false;
  }

  selectYear(year: number) {
    this.currentYear = year;
    this.generateCalendar();
    this.showListYear = false;
  }

  handleScrollTo(position: string) {
    let duration = 3000;
    let targetEl;
    if (position === 'topMonth') {
      targetEl = this.listMonthDivs?.first?.nativeElement;
    } else if (position === 'bottomMonth') {
      targetEl = this.listMonthDivs?.last?.nativeElement;
    } else if (position === 'topYear') {
      targetEl = this.listYearDivs?.first?.nativeElement;
      duration = 10000;
    } else if (position === 'bottomYear') {
      targetEl = this.listYearDivs?.last?.nativeElement;
      duration = 10000;
    }

    const container = targetEl?.parentElement; // ganti jika scroll container bukan parent

    if (targetEl && container) {
      this.scrollSlowlyToElement(container, targetEl, duration);
    }
  }

  scrollSlowlyToElement(container: HTMLElement, target: HTMLElement, duration: number) {
    const start = container.scrollTop;
    const end = target.offsetTop;
    const distance = end - start;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = this.easeInOutQuad(progress);

      container.scrollTop = start + distance * ease - 20;

      if (progress < 1) {
        this.scrollAnimationId = requestAnimationFrame(animateScroll);
      }
    };

    this.scrollAnimationId = requestAnimationFrame(animateScroll);
  }

  easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  stopScrollAnimation() {
    if (this.scrollAnimationId !== 0) {
      cancelAnimationFrame(this.scrollAnimationId);
      this.scrollAnimationId = 0;
    }
  }

  showListMonthModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.showListMonth = !this.showListMonth;
    this.showListYear = false;
    if (this.showListMonth) {
      setTimeout(() => this.scrollToActiveMonth(), 0);
    }
  }

  showListYearModal(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.showListYear = !this.showListYear;
    this.showListMonth = false;

    if (this.showListYear) {
      setTimeout(() => this.scrollToActiveYear(), 0);
    }
  }

  handleClickOutside(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.showListMonth = false;
    this.showListYear = false;
  }

  scrollToActiveMonth() {
    if (this.listMonthDivs) {
      const active = this.listMonthDivs.find((el) => el.nativeElement.classList.contains('active'));
      if (active) {
        active.nativeElement.scrollIntoView({
          block: 'end',
        });
      }
    }
  }

  scrollToActiveYear() {
    if (this.listYearDivs) {
      const active = this.listYearDivs.find((el) => el.nativeElement.classList.contains('active'));
      if (active) {
        active.nativeElement.scrollIntoView({
          block: 'start',
        });
      }
    }
  }

  formatWithIntl(date: Date): string {
    const dayFormatter = new Intl.DateTimeFormat('id-ID', { weekday: 'short' });
    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const dayName = dayFormatter.format(date); // e.g., "Jum"
    const datePart = dateFormatter.format(date); // e.g., "16 Mei 2025"

    return `Today is ${dayName}, ${datePart}`;
  }

  setCalendarToday() {
    this.selectedDate = new Date();
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.generateCalendar();
  }

  setDateFormatDefault(updatedDate: string) {
    this.selectedDate = parse(updatedDate, this.formatDate(), new Date());

    if (!isNaN(this.selectedDate.getTime())) {
      const formatted = format(this.selectedDate, this.formatDate());
      const [, monthStr, yearStr] = formatted.split('/');
      this.currentMonth = parseInt(monthStr) - 1;
      this.currentYear = parseInt(yearStr);

      this.formControl().setValue(formatted, { emitEvent: false });
    }
    this.generateCalendar();
  }

  onblurCheckFormatDate() {
    const value = this.control().value;
    if (value) {
      try {
        const parsedDate = parse(value, this.formatDate(), new Date());
        const isCorrectFormat = format(parsedDate, this.formatDate()) === value;
        const isActuallyValid = isValid(parsedDate) && isCorrectFormat;

        if (!isActuallyValid) {
          this.previousValueDate = !this.previousValueDate
            ? format(this.selectedDate || '', this.formatDate())
            : this.previousValueDate;

          this.control().setValue(this.previousValueDate);
        } else {
          this.setDateFormatDefault(value);
        }
      } catch {
        this.setCalendarToday();
        this.selectDate(this.selectedDate || new Date());
      }
    } else {
      this.setCalendarToday();
    }
  }
}
