import { Component, OnInit } from '@angular/core';
import {Observable, Subject, combineLatest, of} from 'rxjs';
import {FormControl} from '@angular/forms';
import {combineLatestWith, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { Brand, Car } from 'src/app/model/generic';

@Component({
  selector: 'app-example4',
  templateUrl: './example4.component.html',
  styleUrls: ['./example4.component.css']
})
export class Example4Component {

  brandFiltered$: Observable<Brand[]> = of([]);
  cars$: Observable<Car[]> = of([]);
  brandDropdown = new FormControl<string>('');
  carControl = new FormControl<string>('');
  brandChange = new Subject<string>();
  brands$: Observable<Brand[]> = this.dataService.getBrands();

  constructor(private dataService: DataService ) {
    this.brandFiltered$ = this.brandDropdown.valueChanges.pipe(
      withLatestFrom(this.brands$),
      map(([input, brands]) => brands.filter(el => el.description.toLocaleLowerCase().indexOf((input ?? "").toLocaleLowerCase()) != -1)),
    );
    this.cars$ = this.brandChange.asObservable().pipe(
      switchMap(id => this.dataService.getCarsFor(id) ),
      combineLatestWith(this.carControl.valueChanges),
      map(([cars,userInput ]) =>  cars.filter(c => c.description.toLowerCase().indexOf((userInput ?? "").toLowerCase()) !== -1)),
   )
  }


  updateState(brand: Brand) {
    this.brandDropdown.setValue(brand.description);
    this.carControl.setValue('');
    this.brandChange.next(brand.id);
  }
}
