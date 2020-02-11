import {Component, Input, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'ff-country-formatter-cell',
  template: `
    {{ site.country }}
  `,
  styleUrls: ['./ff-id-formatter.component.css'],
})
export class FFCountryFormatterComponent implements OnInit {
//  projectsLists: any =  "one, two, three, four".split(',');
   @Input() context: any;
   public get site() {
     return this.context.cell.item;
   }

  constructor() { 
    //console.log("FF Number Formatter Component ctor");
  }

clearSearch(e) {
  console.log("anchor clicked", e);
}

 triggerAllProject(_event: MouseEvent) {
   console.log("anchor clicked");
        var currentSrc = _event.currentTarget || _event.srcElement;
        $(currentSrc).next(".all-projects-list").toggleClass("active");
    }

  ngOnInit() {
  //  debugger;
   //console.log(this.context.cell.item);
  }

   ngOnDestroy() {
    //console.log("ID formatter onDestroy");
  }
}
