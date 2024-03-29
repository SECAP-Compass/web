export interface Measurement {
    id: number;
    buildingId: number;
    amount: number;
    unit: string;
    timestamp: string;
    type: MeasurementType;
}

export enum MeasurementType {
    Electricity = 'Electricity',
    Liquid_Gas = 'Liquid Gas',
    Natural_Gas = 'Natural Gas',
    Heat = 'Heat',
    Other = 'Other',
}
