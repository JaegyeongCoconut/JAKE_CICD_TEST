import type { RecursiveUndefined } from "./api";

export type Country = {
  name: string;
  code: string;
  dial: string;
};

export interface GetCountriesServerModel {
  countries: Country[];
}

export interface CountryModel {
  [key: string]: Country;
}

export type GetCountriesClientModel = RecursiveUndefined<{
  countries: Country[];
}>;
