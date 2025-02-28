import { v4 as uuidv4 } from "uuid";

export const formatFullName = (
  firstName?: string | null,
  lastName?: string | null,
): string | null => {
  if (!firstName && !lastName) return null;
  return `${firstName || ""} ${lastName || ""}`.trim();
};

export const makeNewImageFileName = (file: File): string => {
  const extension = file.name.split(".").at(-1);

  return `${uuidv4()}.${extension}`;
};
