import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Menggunakan BehaviorSubject untuk menyimpan data
  private dataSubject = new BehaviorSubject<unknown[]>([]);

  // Observable untuk mengakses data
  data$ = this.dataSubject.asObservable();

  // Getter untuk mengakses data
  get data() {
    return this.dataSubject.getValue();
  }

  // Method untuk mengupdate data
  updateData(newData: unknown[]) {
    this.dataSubject.next(newData);
  }

  // Method untuk menambah data
  addData(item: unknown) {
    const currentData = this.dataSubject.getValue();
    this.dataSubject.next([...currentData, item]);
  }

  // Method untuk menghapus data
  removeData(index: number) {
    const currentData = this.dataSubject.getValue();
    currentData.splice(index, 1);
    this.dataSubject.next([...currentData]);
  }
}
