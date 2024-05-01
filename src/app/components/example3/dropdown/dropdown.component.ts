import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map } from 'rxjs';

export interface GenericDropdown{
  description : string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent<T extends GenericDropdown> implements OnInit {
  control = new FormControl('');
  objValue? : T;
  entriesFiltered$?: Observable<T[]>;
  @Input() entries$?: Observable<T[]>;

  @Output() objChange = new EventEmitter<T>();

  @Input()
  get obj(){
    this.control.setValue('')
      return this.objValue;
  }
  set obj(val: T) {
    this.objValue = val;
    if(this.objValue){
      this.control.setValue(this.objValue.description)
    } else {
      this.control.setValue('')
    }
    this.objChange.emit(this.objValue);
  }

  ngOnInit(): void {
    this.entriesFiltered$ = combineLatest([this.control.valueChanges,this.entries$]).pipe(
      map(([userInput, entries]) => (entries|| []).filter(c => (c.description || '').toLowerCase().indexOf(userInput?.toLowerCase() ?? "") !== -1))
    );
  }
  onSelect(obj : T){
    this.control.setValue(obj.description)
    this.objChange.emit(obj)
    this.control.setValue(obj.description)
  }

}
