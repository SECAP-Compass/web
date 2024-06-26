export interface FilteredMeasurements{
    filterType:string;
    name:string;
    measurements:FilteredMeasurement[];
    totalValue:number;
    date:MeasurementDate; 
}

export class FilteredMeasurementsClass implements FilteredMeasurements {
    filterType: string;
    name: string;
    measurements: FilteredMeasurement[];
    totalValue: number;
    date: MeasurementDate;
    values:number[];

    constructor(
        filterType: string,
        name: string,
        date: MeasurementDate,
        measurements: FilteredMeasurement[] = [],
        totalValue: number = 0
    ) {
        this.filterType = filterType;
        this.name = name;
        this.date = date;
        this.measurements = [],
        this.totalValue = 0
    }
}

export interface FilteredMeasurement{
    value:number;
}

export interface GasType{
    name:string;
}

export interface MeasurementTypeHeader{
    name:string;
}

export interface MeasurementDate{
    startDate?: Date;
    endDate?: Date;
}

export interface DateFormat{
    month: number,
    year: number,
}

export class DateFormatClass implements DateFormat{
    month: number;
    year: number;

    constructor( year:number,month: number ){
        this.month = month;
        this.year = year;
    }
}




