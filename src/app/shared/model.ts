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

export class LocationResponse {
  public countries: Array<LocationCountry> = new Array<LocationCountry>();
}
export class LocationCountry {
  public country: CountryDTO;
  public sites: Array<LocationSite>;
}
export class LocationSite {
  public site: SiteDTO;
  public containers: Array<LocationContainer> = new Array<LocationContainer>();
}
export class LocationContainer {
  public container: ContainerDTO;
  public lockers: Array<LocationLocker> = new Array<LocationLocker>();
}
export class LocationLocker {
  public locker: LockerDTO;
}
export class TypeResponse {
  public categories: Array<TypeCategory> = new Array<TypeCategory>();
}
export class TypeCategory {

  public category: CategoryDTO;
  public subcategories: Array<TypeSubcategory> = new Array<TypeSubcategory>();
}
export class TypeSubcategory {
  public subcategory: SubcategoryDTO;
}

export class ItemDetailResponse {
  public item: ItemDTO;
  public loans: ItemDetailLoan;
  public availability: Array<ItemDetailAvailabilityContainer> = new Array<ItemDetailAvailabilityContainer>();
}
export class ItemDetailAvailabilityContainer {
  public container: ContainerDTO;
  public site: SiteDTO;
  public country: CountryDTO;
  public total: number;
  public available: number;
}
export class ItemDetailLoan {
  public loanDate: Date;
  public returnDate: Date;
  public dueDate: Date;
}
