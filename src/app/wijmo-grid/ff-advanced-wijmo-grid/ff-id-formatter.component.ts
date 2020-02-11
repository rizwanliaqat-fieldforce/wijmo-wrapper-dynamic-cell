import {Component, Input, Inject} from '@angular/core';

@Component({
  selector: 'ff-id-formatter-cell',
  template: `
  
{{ site.id }}
  `,
  styleUrls: ['./ff-id-formatter.component.css'],

})
export class FFIdFormatterComponent {

@Input() context: any;
   public get site() {
     return this.context.cell.item;
   }
   
  constructor() {
   // console.log(params);
    // reference types also not rendering
    // this.site = params;
  }

clearSearch(e) {
  console.log("anchor clicked", e);
}

 triggerAllProject(_event: MouseEvent) {
   console.log("anchor clicked");
        var currentSrc = _event.currentTarget || _event.srcElement;
       // $(currentSrc).next(".all-projects-list").toggleClass("active");
    }

  ngOnInit() {
  // console.log("FF Number Formatter Component on init");
  }

   ngOnDestroy() {
    //console.log("ID formatter onDestroy");
  }
}
