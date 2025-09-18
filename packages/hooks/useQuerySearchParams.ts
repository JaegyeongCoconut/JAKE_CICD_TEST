import { useSearchParams } from "react-router-dom";

const useQuerySearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addQueryParam = (
    queryParams: { [key: string]: string },
    additionQueryParam: { [key: string]: string },
  ): { [key: string]: string } => {
    for (const [key, value] of Object.entries(additionQueryParam)) {
      queryParams[key] = value;
    }

    return queryParams;
  };

  const deleteQueryParams = (
    queryParams: { [key: string]: string },
    deletionQueryKeys: string[],
  ): { [key: string]: string } => {
    for (const key of deletionQueryKeys) {
      delete queryParams[key];
    }

    return queryParams;
  };

  const updateQueryParam = (
    additionQueryParam: { [key: string]: string },
    deletionQueryKeys?: string[],
  ): void => {
    let newQueryParams = Object.fromEntries(searchParams.entries());

    newQueryParams = addQueryParam(newQueryParams, additionQueryParam);
    newQueryParams = deletionQueryKeys
      ? deleteQueryParams(newQueryParams, deletionQueryKeys)
      : newQueryParams;

    setSearchParams(newQueryParams);
  };

  return { updateQueryParam };
};

export default useQuerySearchParams;
