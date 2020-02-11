import {Component, Input, Inject} from '@angular/core';


@Component({
  selector: 'ff-country-formatter-cell',
  template: `
    hello
  `,
  styleUrls: ['./ff-id-formatter.component.css']
 //providers: [DynamicData]
})
export class FFCountryFormatterComponent {
//  projectsLists: any =  "one, two, three, four".split(',');
   @Input() context: any;
  constructor() {
    //console.log("FF Number Formatter Component ctor");
  }

      public get projectsLists() {
        return Object.keys(this.context.cell.item);
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
  // console.log("FF Number Formatter Component on init");
  }

   ngOnDestroy() {
    //console.log("ID formatter onDestroy");
  }
}
