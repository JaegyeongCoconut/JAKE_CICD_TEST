import type { PageQuery } from "./server";

export interface GetColorsQueryModel {
  query: PageQuery;
}

export interface GetFuelTypesQueryModel {
  query: PageQuery;
}

export interface GetMakersQueryModel {
  query: { name?: string } & PageQuery;
}

export interface GetTransmissionsQueryModel {
  query: PageQuery;
}
