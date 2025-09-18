import type { UseMutationOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

interface UsePreventDuplicateMutationProps<
  TData,
  TError,
  TVariables,
  TContext = unknown,
> {
  mutationKey: readonly unknown[];
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn" | "mutationKey"
  >;
  mutationFn: (variables: TVariables) => Promise<TData>;
}
const activeMutations = new Set<string>();

//LINK: https://www.notion.so/coconutsilo/API-2150bccf5e30808d9daad8c29e499623
const usePreventDuplicateMutation = <
  TData,
  TError,
  TVariables,
  TContext = unknown,
>({
  mutationKey,
  options,
  mutationFn,
}: UsePreventDuplicateMutationProps<TData, TError, TVariables, TContext>) => {
  const keyString = JSON.stringify(mutationKey);

  return useMutation<TData | undefined, TError, TVariables, TContext>({
    mutationKey,
    mutationFn: async (variables: TVariables): Promise<TData | undefined> => {
      if (activeMutations.has(keyString)) {
        console.warn("Duplicate request ignored");
        return Promise.resolve(undefined);
      }
      activeMutations.add(keyString);

      try {
        return await mutationFn(variables);
      } finally {
        activeMutations.delete(keyString);
      }
    },
    ...options,
    onSuccess: (data, variables, context) => {
      if (data === undefined) return; //NOTE: 미설정 시 중복 호출 횟수만큼 동작

      options?.onSuccess?.(data, variables, context);
    },
    onError: options?.onError,
    onSettled: (data, error, variables, context) => {
      if (data === undefined) return; //NOTE: 미설정 시 중복 호출 횟수만큼 동작

      options?.onSettled?.(data, error, variables, context);
    },
  });
};

export default usePreventDuplicateMutation;
