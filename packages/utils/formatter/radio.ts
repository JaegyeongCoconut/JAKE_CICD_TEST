import type { Languages } from "@repo/types";

interface FilterRadioExceptCurrentState<T, U extends Languages> {
  radios: readonly { key: T; label: U }[];
  initData: T | null;
}

export const filterRadioExceptInitData = <T, U extends Languages>({
  radios,
  initData,
}: FilterRadioExceptCurrentState<T, U>): {
  filteredDefaultRadio: { key: T; label: U };
  filteredRadios: { key: T; label: U }[];
} => {
  const filteredRadios = radios.filter((radio) => radio.key !== initData);
  const filteredDefaultRadio = filteredRadios[0];

  return { filteredDefaultRadio, filteredRadios };
};
