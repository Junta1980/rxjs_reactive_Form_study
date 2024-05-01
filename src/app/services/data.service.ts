import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Brand, Car } from '../model/generic.type';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private brand$: Observable<Brand[]>;

  constructor(private http: HttpClient) {
    this.brand$ = http.get<Brand[]>('http://localhost:3000/brand');
  }

  getBrands(): Observable<Brand[]> {
    return this.brand$;
  }

  getCarsFor(Id: string): Observable<Car[]> {
    return this.http.get<Car[]>(`http://localhost:3000/car?id=${Id}`)
      .pipe(
        map(cars => cars.sort((a, b) => (a.description > b.description) ? 1 : -1))
      );
  }
}
