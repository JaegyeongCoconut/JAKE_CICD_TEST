import { v4 as uuidv4 } from "uuid";

interface FormatFullNameProps {
  firstName: string | undefined | null;
  lastName: string | undefined | null;
}

export const formatFullName = ({
  firstName,
  lastName,
}: FormatFullNameProps): string | null => {
  if (!firstName?.trim() && !lastName?.trim()) return null;

  return `${firstName || ""} ${lastName || ""}`.trim();
};

export const makeNewImageFileName = (file: File): string => {
  const extension = file.name.split(".").at(-1);

  return `${uuidv4()}.${extension}`;
};
