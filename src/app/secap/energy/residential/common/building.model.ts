export interface Building {
    id: number;
    name: string;
    address: Address;
    area: Area;
    type: String;
}

export interface Area {
    value: number,
    unit: string
}

export interface Address {
    country: string;
    region: string;
    province: AddressPair;
    district: AddressPair;
}

export interface AddressPair {
    id: number;
    value: string;
}
