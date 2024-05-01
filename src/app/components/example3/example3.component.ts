import { Component, OnInit } from '@angular/core';
import {Observable, Subject, map, of, switchMap, withLatestFrom} from 'rxjs';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Brand, Car } from 'src/app/model/generic.type'

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.css']
})
export class Example3Component {

  brands$: Observable<Brand[]> = this.dataService.getBrands();
  brandFiltered$: Observable<Brand[]> = of([]);
  cars$: Observable<Car[]> = of([]);
  brand?: Brand;
  car?: Car;
  currentBrand$ = new Subject<Brand['id']>();

  constructor(private dataService: DataService ) { }

  ngOnInit(): void {
    this.cars$ = this.currentBrand$.asObservable().pipe(
      switchMap(id => this.dataService.getCarsFor(id))
    );
  }

  updateState(brand: Brand) {
    this.brand = brand;
    this.currentBrand$.next(brand.id)
  }
}
