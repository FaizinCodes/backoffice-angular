import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/component/input/input.component';

@Component({
  selector: 'app-add-employee',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
})
export class AddEmployeeComponent implements OnInit {
  formEmployee!: FormGroup;
  payload: unknown;

  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.formEmployee = this.formBuilder.group({
      name: ['', [Validators.required]],
      npwp: ['', [Validators.required]],
      ktp: ['', [Validators.required]],
      kk: ['', [Validators.required]],
      address: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      employeeType: ['', [Validators.required]],
      taxType: ['', [Validators.required]],
    });
  }

  get nameControl(): FormControl {
    return this.formEmployee?.get('name') as FormControl;
  }

  get npwpControl(): FormControl {
    return this.formEmployee?.get('npwp') as FormControl;
  }

  get salaryControl(): FormControl {
    return this.formEmployee?.get('salary') as FormControl;
  }

  get employeeTypeControl(): FormControl {
    return this.formEmployee.get('employeeType') as FormControl;
  }

  get kkControl(): FormControl {
    return this.formEmployee.get('kk') as FormControl;
  }

  get ktpControl() {
    return this.formEmployee?.get('ktp') as FormControl;
  }

  get addressControl() {
    return this.formEmployee?.get('address') as FormControl;
  }

  get taxTypeControl() {
    return this.formEmployee?.get('taxType') as FormControl;
  }

  submitForm() {
    this.payload = this.formEmployee.getRawValue();
  }
}
