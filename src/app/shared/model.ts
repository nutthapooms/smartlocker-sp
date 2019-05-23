export class LockerResponse {
  id: number;
  name: string;
  description: string;
  total: number;
  available: number;
}

export class ContainerResponse {
  id: number;
  name: string;
  description: string;
  total: number;
  available: number;
  lockers: Array<LockerResponse> = Array<LockerResponse>();
}

export class SiteResponse {
  id: number;
  name: string;
  description: string;
  containers: Array<ContainerResponse> = new Array<ContainerResponse>();
}

export class CountryResponse {
  id: number;
  name: string;
  description: string;
  sites: Array<SiteResponse> = new  Array<SiteResponse>();
}

export class ItemResponse {
  id: number;
  name: string;
  description: string;
  defaultDuration: number;
  available: number;
  total: number;
  subcategoryName: string;
  categoryName: string;
  images: Array<string>;
  availability: Array<CountryResponse>
}
