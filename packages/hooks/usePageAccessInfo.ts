import type { InaccessInfo } from "@repo/types";

interface PageAccessInfoProps {
  inaccessInfo: InaccessInfo;
  level: string | number;
}

const usePageAccessInfo = ({ level, inaccessInfo }: PageAccessInfoProps) => {
  const accessInfo = level
    ? inaccessInfo[level]
    : { path: [], redirectPage: "" };

  const isAccessLocationParameter = () => {
    const currentPath = `/${location?.pathname?.split("/").slice(1).join("/")}`;

    const precompiledRegexes = accessInfo.path.map((accessiblePath) => {
      const regexPattern = accessiblePath
        .replace(/:[^/]+/g, "[^/]+")
        .replace(/\//g, "\\/");

      return new RegExp(`^${regexPattern}$`);
    });

    return precompiledRegexes.some((regex) => regex.test(currentPath));
  };

  const isAccessiblePage = !(
    isAccessLocationParameter() ||
    accessInfo.path.includes(`${location?.pathname}${location?.search}`)
  );

  return { accessInfo, isAccessiblePage };
};

export default usePageAccessInfo;
