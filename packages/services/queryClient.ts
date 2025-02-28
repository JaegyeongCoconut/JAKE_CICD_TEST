import { QueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

function queryErrorHandler(error: AxiosError): void {
  console.log(error);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 0, //NOTE: 공식문서에서 staleTime의 default가 0이지만 그렇지 않아 명시적 지정 ++ API 호출이 2번 일어나는 이슈로 주석
      // cacheTime: 1000 * 60 * 5, // 기본 값 사용 - 5분
      // refetchOnMount: true, // 기본 값 사용 - true
      // refetchOnReconnect: true, // 기본 값 사용 - true
      refetchOnWindowFocus: false,
      retry: 0, //
      suspense: true,
      onError: (error) => queryErrorHandler(error as AxiosError),
    },
    mutations: {
      onError: (error) => queryErrorHandler(error as AxiosError),
    },
  },
});
