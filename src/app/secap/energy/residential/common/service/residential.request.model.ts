import {Address, Area} from "../building.model";

export interface CreateResidentialRequest {
    area: Area
    address: Address
    buildingType: string
}
