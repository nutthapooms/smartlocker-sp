export class LockerResponse {
  id: number;
  name: string;
  description: string;
}

export class ContainerResponse {
  id: number;
  name: string;
  description: string;
}

export class SiteResponse {
  id: number;
  name: string;
  description: string;
}

export class CountryResponse {
  id: number;
  name: string;
  description: string;
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
}
