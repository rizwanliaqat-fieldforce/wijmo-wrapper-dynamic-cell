import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { FFIdFormatterComponent } from '../ff-advanced-wijmo-grid/ff-id-formatter.component';
import { FFCountryFormatterComponent } from '../ff-advanced-wijmo-grid/ff-country-formatter.component';
import { ColumDefinition } from '../../models/ColumDefinition';

@Component({
    selector: 'advanced-wijmo-grid-demo',
    templateUrl: './advanced-wijmo-grid-demo.component.html'
})

export class AdvancedWijmoGridDemoComponent implements OnInit {

    rowData: any;
    colDefs: ColumDefinition[];

    colDefId: ColumDefinition  = {
        header: "ID",
        binding: "id",
        allowSorting: false,
        allowFilter: false,
        format: 'f0',
        customCell: FFIdFormatterComponent
    };

    colDefAthlete: ColumDefinition  = {
        header: "Athlete",
        binding: "athlete",
        allowSorting: true,
        allowFilter: false
    };

    colDefAge: ColumDefinition  = {
        header: "Age",
        binding: "age",
        allowSorting: true,
        allowFilter: true
    };

    colDefCountry: ColumDefinition  = {
        header: "Country",
        binding: "country",
        allowSorting: true,
        allowFilter: true,
         customCell: FFCountryFormatterComponent
    };

    colDefYear: ColumDefinition  = {
        header: "Year",
        binding: "year",
        format: 'f0',
        allowSorting: true,
        allowFilter: true
    };

    colDefSport: ColumDefinition  = { header: "Sport", binding: "sport" };
    colDefGold: ColumDefinition  = { header: "Gold", binding: "gold" };
    colDefSilver: ColumDefinition  = { header: "Silver", binding: "silver" };
    colDefBronze: ColumDefinition  = { header: "Bronze", binding: "bronze" };

    constructor(private dataService: DataService) {
        this.colDefs = [
            this.colDefId,
            this.colDefAthlete,
            this.colDefAge,
            this.colDefCountry,
            this.colDefYear,
            this.colDefSport,
            this.colDefGold,
            this.colDefSilver,
            this.colDefBronze
        ];
    }


    ngOnInit() {
        this.dataService.getAthletes({ startRow: 0, endRow: 120 })
            .subscribe(res => {
                this.rowData = res.rows;
            });
    }

        onChangeSorting(sortParams) {
        console.log("sortParams received in parent", sortParams);
    }
}

