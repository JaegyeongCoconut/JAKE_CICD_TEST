export type Country = {
  code: string;
  name: string;
  dial: string;
};

export interface GetCountriesServerModel {
  countries: Country[];
}

export interface GetCountriesClientModel {
  [key: string]: Country;
}
