import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Injector,
  InjectionToken,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
    EmbeddedViewRef,
  ComponentFactoryResolver,
  ApplicationRef
} from "@angular/core";

import { CollectionView, EventArgs, SortDescription } from "wijmo/wijmo";
import * as wjcGrid from "wijmo/wijmo.grid";
import { FlexGridFilter, FilterType } from "wijmo/wijmo.grid.filter";
import { FlexGrid, CellType } from "wijmo/wijmo.grid";
import { DynamicData } from "../../models/DynamicData";

let sort = {
  col: null,
  dir: null
};

@Component({
  selector: "ff-advanced-wijmo-grid",
  templateUrl: "./ff-advanced-wijmo-grid.component.html",
  styleUrls: ["./ff-advanced-wijmo-grid.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FFAdvancedWijmoGridComponent implements OnInit, OnChanges {
  // properties
  dataSource: CollectionView = null;
  colums: CollectionView;
  // input params
  @Input() rowData: any;
  @Input() columnData: any;
  @Input() pageSize: number;
  @Input() pagination: boolean;
  @Input() gridParent: any;

  // output events
  @Output() onChangeSorting: EventEmitter<any> = new EventEmitter();
  @Output() onChangeFiltering: EventEmitter<any> = new EventEmitter();
  @Output() onChangePaging: EventEmitter<any> = new EventEmitter();

  // grid and filter DOM reference
  @ViewChild("grid") grid: FlexGrid;
  @ViewChild("filter", null) filter: FlexGridFilter;

  constructor(public paramsInjector: Injector, public componentFactoryResolver: ComponentFactoryResolver, public appRef: ApplicationRef) {
    console.log("ctor - ff advanced wijmo grid");
    this.colums = new CollectionView();
    this.pageSize = 10;
  }

  createInjector(item) {
    let injector = Injector.create(
      [{ provide: DynamicData, useValue: item }],
      this.paramsInjector
    );
    return injector;
  }

  ngOnInit() {
    console.log("on init - ff advanced wijmo grid");

    let filterCols = [];
    this.columnData.forEach((item, index) => {
      this.colums.sourceCollection.splice(Math.max(0, index), 0, item);
      if (item && item.allowFilter) {
        filterCols.push(item.binding);
      }
    });

    this.filter.filterColumns = filterCols;
  }

  initgrid(grid) {
    let _oldUpdate = grid.cellFactory.updateCell;
    grid.cellFactory.updateCell = this.updateCell(_oldUpdate);
  }

  updateCell(_oldUpdate: Function) {
    var self = this;
    var handler = function(panel, row, col, cell, rng, updateContent) {
      _oldUpdate.call(this, panel, row, col, cell, rng, updateContent);
      if(panel.cellType === wjcGrid.CellType.Cell && self.columnData[col].customCell) {
        cell.innerHTML = '';
        var component = self.columnData[col].customCell;
        const factory = self.componentFactoryResolver.resolveComponentFactory(component);
        var item = panel.rows[row].dataItem;
        const viewRef = factory.create(self.createInjector(item));
        cell.appendChild((viewRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);
      }
    }
    return handler;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("on changes advanced wijmo grid");
    //console.log("grid: ", this.grid);
    this.dataSource = new CollectionView(this.rowData, {
      pageSize: this.pagination ? this.pageSize : 0
    });
  }

  gridReady(flex: FlexGrid, e: EventArgs) {
    console.log("initialized - ff advanced wijmo grid");
  }

  sourceChanged(flex: FlexGrid, e: EventArgs) {
    console.log("sourceChanged - ff advanced wijmo grid");
    //console.log("grid: ", this.grid);
    if (!(flex && flex.collectionView)) {
      return;
    }
  }

  sortingColumn(sender, args) {
    // emit sorting info
    // args.cancel = true;
    // determine new sort
    if (sort.col == sender.columns[args.col].binding) {
      sort.dir = sort.dir == "asc" ? "desc" : "asc";
    } else {
      sort.col = sender.columns[args.col].binding;
      sort.dir = "asc";
    }
   // this.refresh(sender);
   // sender.collectionView.sortDescriptions.clear();
args.cancel = true;
console.log("sorting");
this.onChangeSorting.emit(sort);
  }

  // disable sort and filter on client if we're doing it on the server
  refresh(sender) {
    // save settings
    var canFilter = sender.collectionView._canFilter,
      canSort = sender.collectionView._canSort;

    // perform refresh
    sender.collectionView._canFilter = false//!sender.collectionView._filterOnServer;
    sender.collectionView._canSort = false//!sender.collectionView._sortOnServer;
    sender.collectionView._performRefresh();

    // restore settings
    sender.collectionView._canFilter = canFilter;
    sender.collectionView._canSort = canSort;
  }

  sortedColumn(sender, args) {
    // determine new sort
    console.log("sorted column");
    if (sort.col == sender.columns[args.col].binding) {
      sort.dir = sort.dir == "asc" ? "desc" : "asc";
    } else {
      sort.col = sender.columns[args.col].binding;
      sort.dir = "asc";
    }

    this.refresh(sender);

    // working but get called twice
    // sender.collectionView.sortDescriptions.clear();
    // this.onChangeSorting.emit(sort);
  }

  itemFormatter(panel, r, c, cell) {
    if (panel.cellType == wjcGrid.CellType.ColumnHeader) {
      let col = panel.columns[c];
      console.log("headerFound");
      if (sort && col && sort.col == col.binding) {
        if (sort.dir == "a") {
          cell.innerHTML = col.header + ' <span class="wj-glyph-up"></span>';
        } else {
          cell.innerHTML = col.header + ' <span class="wj-glyph-down"></span>';
        }
      }
    }
  }

  updatingView(flex: FlexGrid, e: EventArgs) {
    // console.log("updatingView - ff advanced wijmo grid");
    // console.log("grid: ", flex);
  }

  updatedView(flex: FlexGrid, e: EventArgs) {
    // console.log("updatedView - ff advanced wijmo grid");
    // console.log("grid: ", flex);
  }

  updatedLayout(flex: FlexGrid, e: EventArgs) {
    // console.log("updatedLayout - ff advanced wijmo grid");
    // console.log("grid: ", flex);
  }

  updatingLayout(flex: FlexGrid, e: EventArgs) {
    // console.log("updatingLayout - ff advanced wijmo grid");
    // console.log("grid: ", flex);
  }
}
