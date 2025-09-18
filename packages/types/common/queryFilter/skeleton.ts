import type { Languages } from "../language";

export interface QueryFilterFieldControlSkeletonType {
  hasRadio: boolean;
  label: Languages;
  labelWidth?: number; // TODO: 임시 Optional 처리 추후 필수값으로 변경 필요
}

export type QueryFilterRowSkeletonType = {
  controls: QueryFilterFieldControlSkeletonType[];
  partition: number;
};
