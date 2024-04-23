export interface CityModel {
    id: number;
    name: string;
    population: number;
    coordinates: Record<string, number>;
    maps: Record<string, string>;
    region: Record<string, string>;
    districts: Record<string, District>;
}

export interface District {
    id: number;
    name: string;
    area: number;
    population: number;
    provinceId: number;
}
