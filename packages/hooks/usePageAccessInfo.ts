import type { InaccessInfo } from "@repo/types";

interface PageAccessInfoProps {
  level: string | number;
  inaccessInfo: InaccessInfo;
}

const usePageAccessInfo = ({ level, inaccessInfo }: PageAccessInfoProps) => {
  const accessInfo = level
    ? inaccessInfo[level]
    : { path: [], redirectPage: "" };

  const isAccessLocationParameter = () => {
    const currentPath = `/${location?.pathname?.split("/").slice(1).join("/")}`;

    return accessInfo.path.some(
      (accessiblePath) => currentPath.indexOf(accessiblePath) > -1,
    );
  };

  const isAccessiblePage = !(
    isAccessLocationParameter() ||
    accessInfo.path.includes(`${location?.pathname}${location?.search}`)
  );

  return { accessInfo, isAccessiblePage };
};

export default usePageAccessInfo;
