import { DateFormat } from "./measurement-type.model";


export interface MeasurementCollection{
  measurements:Measurement[];
  count:number;
  pageSize:number;
}

export interface ReportModel{
  id: string,
  data: MeasurementCalculation,
  lastModifiedDate: Date,
}

export interface BuildingMeasurement {
    id: string;
    buildingId: string;
    measurement: Measurement;
    createdBy: string;
  }
  
  export interface Measurement {
    value: number;
    unit: string;
    measurementType: string;
    measurementTypeHeader: string;
    measurementDate: MeasurementDate;
    measurementCalculation: MeasurementCalculation;
  }
  
  export interface MeasurementCalculation {
    // Define properties as per your backend model
    co2: number,
    ch4: number,
    n2O: number,
    co2e: number,
    biofuelCO2: number,
    ef: number
  }
  
  export interface MeasurementDate {
    month?: number;
    year?: number;
  }


