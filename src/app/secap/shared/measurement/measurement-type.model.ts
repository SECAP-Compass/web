import { Building } from "../../energy/residential/common/building.model";

export interface Measurements{
    measurements:Measurement[];
    total:number;
    date:MeasurementDate; 
}

export interface Measurement{
    id: number;
    measurementByType: Emission[];
    total:number;
}

export interface Emission{
    measurementType: string;
    gasses: GasMeasurement[];
    total:number;
}

export interface GasMeasurement{
    gas:string;
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

