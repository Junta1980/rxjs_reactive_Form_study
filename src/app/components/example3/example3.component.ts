import { Component, OnInit } from '@angular/core';
import {Observable, map, of, withLatestFrom} from 'rxjs';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Brand } from 'src/app/model/generic'

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.css']
})
export class Example3Component {

  brands$: Observable<Brand[]> = this.dataService.getBrands();
  brandDropdown = new FormControl('');
  brandFiltered$: Observable<Brand[]> = of([]);
  cars$: Observable<Brand[]> = of([]);

  constructor(private dataService: DataService ) { }

  ngOnInit(): void {
    this.brandFiltered$ = this.brandDropdown.valueChanges.pipe(
        withLatestFrom(this.brands$),
        map(([input, brands]) => brands.filter(el => el.description.toLocaleLowerCase().indexOf((input ?? "").toLocaleLowerCase()) != -1)),
      );
    }

  updateState(brand: Brand) {
    this.brandDropdown.setValue(brand.description);
    this.cars$ = this.dataService.getCarsFor(brand.id);
  }
}
