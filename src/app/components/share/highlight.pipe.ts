import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strToHighlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, highlight: string): unknown {
    const index = value.toLowerCase().indexOf(highlight.toLowerCase());
    if (index >= 0) {
      return value.substring(0, index) + '<b>'
        + value.substring(index, highlight.length + index)
        + '</b>'
        + value.substring(highlight.length + index);
    }
    return value;
  }

}
