import { Type } from "@angular/core";

export interface ColumDefinition {
    header?: string;
    binding: string;
    allowSorting?: boolean;
    allowFilter?: boolean;
    width?: string;
    format?: any;
    customCell?: Type<any>;
}