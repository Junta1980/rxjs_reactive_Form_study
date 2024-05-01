import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/model/generic.type';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.css']
})
export class Example1Component {
  myControl = new FormControl<Brand['id']>('');
  brands$: Observable<Brand[]> = this.dataService.getBrands();

  constructor(private dataService: DataService ) { }


}




