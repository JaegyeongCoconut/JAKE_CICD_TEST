import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "./dayjsSetup";

type DateArgs = Dayjs | string | number | Date;

interface BaseFormatTimeProps {
  date: DateArgs;
  template?: string;
}

const calcHourDiffICTWithUTC0 = () =>
  dayjs.utc().tz("Asia/Vientiane").utcOffset() / 60;

export const isElapsed = (date: string): boolean => {
  const PICK_UP_BEFORE_MIN = -30;
  const now = dayjs().utc();
  const elapsedTime = now.diff(date, "m");

  return elapsedTime > PICK_UP_BEFORE_MIN ? true : false;
};

interface FormatUnixToLocalDateTimeProps
  extends Omit<BaseFormatTimeProps, "date"> {
  date: number;
}

// NOTE: Unix Timestamp를 로컬 시간으로 포매팅 된 string 필요 시 사용
export const formatUnixToLocalDateTime = ({
  date,
  template = "DD/MM/YYYY, HH:mm",
}: FormatUnixToLocalDateTimeProps): string => dayjs.unix(date).format(template);

// NOTE: 로컬 시간으로 포매팅 된 string 필요 시 사용
export const formatLocalDateTime = ({
  date,
  template = "DD/MM/YYYY",
}: BaseFormatTimeProps): string => dayjs(date).format(template);

// NOTE: ICT 시간으로 포매팅 된 string 필요 시 사용
export const formatICTDateTime = ({
  date,
  template = "DD/MM/YYYY, HH:mm",
}: BaseFormatTimeProps): string =>
  dayjs.utc(date).tz("Asia/Vientiane").format(template);

interface FormatPeriodToUTCProps {
  isLocalTime: boolean;
  localDate: string;
  type: "startDate" | "endDate";
}

export const formatPeriodToUTC = ({
  type,
  localDate,
  isLocalTime,
}: FormatPeriodToUTCProps) => {
  if (!localDate) return "";

  let date = isLocalTime
    ? dayjs.utc(localDate, "DD/MM/YYYY")
    : dayjs.utc(localDate, "DD/MM/YYYY").tz("Asia/Vientiane");

  if (!isLocalTime) {
    date = date.subtract(calcHourDiffICTWithUTC0(), "hour");
  }

  switch (type) {
    case "startDate":
      return date.toISOString();
    case "endDate":
      return date.add(1, "day").toISOString();
  }
};
