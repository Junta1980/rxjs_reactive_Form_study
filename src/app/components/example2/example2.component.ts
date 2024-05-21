import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, switchMap } from 'rxjs';
import { Brand, Car } from 'src/app/model/generic.type';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.css']
})
export class Example2Component {
  brandDropdown = new FormControl<Brand['id']>('');
  carDropdown = new FormControl<Car['id']>('');
  brands$: Observable<Brand[]> = this.dataService.getBrands();
  car$:  Observable<Car[]> = of([]);

  constructor(private dataService: DataService ) { }

  ngOnInit(): void {
    this.car$ = this.brandDropdown.valueChanges.pipe(
        switchMap( Id => {
          return this.dataService.getCarsFor(Id || '')
        })
      )
    }
}
