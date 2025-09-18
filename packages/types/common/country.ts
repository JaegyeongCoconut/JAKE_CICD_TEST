export type Country = {
  name: string;
  code: string;
  dial: string;
};

export interface GetCountriesServerModel {
  countries: Country[];
}

//NOTE: 공용 코드라서 타입수정X, 다른 서비스와 같이 수정 필요
export interface GetCountriesClientModel {
  [key: string]: Country;
}
