import {Component, Input, Inject} from '@angular/core';


@Component({
  selector: 'ff-id-formatter-cell',
  template: `
     <a  href="javascript:void(0);"  (click)="triggerAllProject($event)" class="view-all-projects">View All</a>
    <div class="all-projects-list scrollY" style="max-height: 160px;color: black;">
        <ul>
            <ng-container *ngFor="let siteP2 of projectsLists">
                <li>{{siteP2}}</li>
            </ng-container>

        </ul>
    </div>
  `,
  styleUrls: ['./ff-id-formatter.component.css']
 //providers: [DynamicData]
})
export class FFIdFormatterComponent {
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
