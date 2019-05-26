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


export class ItemDTO {
  public id: number;
  public name: string;
  public images: Array<number>;
  public defaultDuration: number;
}
export class CategoryDTO {
  public id: number;
  public name: string;
}
export class SubcategoryDTO {
  public id: number;
  public name: string;
}
export class CountryDTO {
  public id: number;
  public name: string;
}
export class SiteDTO {
  public id: number;
  public name: string;
}
export class ContainerDTO {
  public id: number;
  public name: string;
}
export class LockerDTO {
  public id: number;
  public name: string;
}

export class DashboardLoanResponse {
  public total: number;
  public units: Array<DashboardLoanUnit> = new Array<DashboardLoanUnit>();
}
export class DashboardLoanUnit {
  public item: ItemDTO;
  public category: CategoryDTO;
  public subcategory: SubcategoryDTO;
  public country: CountryDTO;
  public site: SiteDTO;
  public container: ContainerDTO;
  public locker: LockerDTO;
  public loanDate: Date;
  public returnDate: Date;
}
export class DashboardWatchResponse {
  public total: number;
  public items: Array<DashboardWatchItem> = new Array<DashboardWatchItem>();
}
export class DashboardWatchItem {
  public item: ItemDTO;
  public category: CategoryDTO;
  public subcategory: SubcategoryDTO;
  public country: CountryDTO;
  public site: SiteDTO;
  public container: ContainerDTO;
  public available : number;
  public total : number;

  public watchSince: Date;
}

export class BrowseResponse {
  public total: number;
  public items: Array<BrowseItem> = new Array<BrowseItem>();
}
export class BrowseItem {
  public item: ItemDTO;
  public category: CategoryDTO;
  public subcategory: SubcategoryDTO;
  public total: number;
  public available: number;
}
