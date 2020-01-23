import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import athletes from './athletes'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cars: any = [{"make":"Porsche","model":"Boxter","price":72000},{"make":"Toyota","model":"Celica","price":35000},{"make":"Ford","model":"Mondeo","price":32000},{"make":"Porsche","model":"Boxter","price":72000},{"make":"Toyota","model":"Celica","price":35000},{"make":"Ford","model":"Mondeo","price":32000},{"make":"Porsche","model":"Boxter","price":72000},{"make":"Toyota","model":"Celica","price":35000},{"make":"Ford","model":"Mondeo","price":32000},{"make":"Porsche","model":"Boxter","price":72000}];
  

  constructor() { }

  getCarsList(start=0, end=10) {
    return of(this.cars.slice(start, end));
  }

  getAthletes(params: any) {
    console.log("get athletes service");
    let dataAfterSortingAndFiltering = sortAndFilter(athletes.slice(), params.sortModel, params.filterModel);
    let rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
    let lastRow = -1;
    if (dataAfterSortingAndFiltering.length <= params.endRow) {
      lastRow = dataAfterSortingAndFiltering.length;
    }
    
    return of({
      success: true,
      rows: rowsThisPage,
      lastRow: lastRow
    });
  }

}

function sortAndFilter(allOfTheData, sortModel, filterModel) {
  return sortData(sortModel, filterData(filterModel, allOfTheData));
}
function sortData(sortModel, data) {
  let sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  let resultOfSort = data.slice();
  resultOfSort.sort(function(a, b) {
    for (let k = 0; k < sortModel.length; k++) {
      let sortColModel = sortModel[k];
      let valueA = a[sortColModel.colId];
      let valueB = b[sortColModel.colId];
      if (valueA == valueB) {
        continue;
      }
      let sortDirection = sortColModel.sort === "asc" ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    return 0;
  });
  return resultOfSort;
}
function filterData(filterModel, data) {
  let filterPresent = filterModel && Object.keys(filterModel).length > 0;
  if (!filterPresent) {
    return data;
  }
  let resultOfFilter = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (filterModel.age) {
      let age = item.age;
      let allowedAge = parseInt(filterModel.age.filter);
      if (filterModel.age.type == "equals") {
        if (age !== allowedAge) {
          continue;
        }
      } else if (filterModel.age.type == "lessThan") {
        if (age >= allowedAge) {
          continue;
        }
      } else {
        if (age <= allowedAge) {
          continue;
        }
      }
    }
    if (filterModel.year) {
      if (filterModel.year.values.indexOf(item.year.toString()) < 0) {
        continue;
      }
    }
    if (filterModel.country) {
      if (filterModel.country.values.indexOf(item.country) < 0) {
        continue;
      }
    }
    resultOfFilter.push(item);
  }
  return resultOfFilter;
}
