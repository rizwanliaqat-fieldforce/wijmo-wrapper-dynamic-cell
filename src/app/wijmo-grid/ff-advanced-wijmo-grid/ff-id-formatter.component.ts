import {Component, Input, Inject} from '@angular/core';

import { DynamicData } from "../../models/DynamicData";

@Component({
  selector: 'ff-id-formatter-cell',
  template: `
{{ site.country }}
  `,
  styleUrls: ['./ff-id-formatter.component.css'],
 //providers: [DynamicData]
})
export class FFIdFormatterComponent {
  // value types also not binding
  //
  public site = 'USA';
//  projectsLists: any =  "one, two, three, four".split(',');
  constructor(@Inject(DynamicData) public params: any) {
    console.log(params);
    // reference types also not rendering
    this.site = params;
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
