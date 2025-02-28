import dayjs, { Dayjs } from "dayjs";
import "./dayjsSetup";

type DateArgs = Dayjs | string | number | Date;

const calcHourDiffICTWithUTC0 = () =>
  dayjs.utc().tz("Asia/Vientiane").utcOffset() / 60;

export const isElapsed = (date: string): boolean => {
  const PICK_UP_BEFORE_MIN = -30;
  const now = dayjs().utc();
  const elapsedTime = now.diff(date, "m");

  return elapsedTime > PICK_UP_BEFORE_MIN ? true : false;
};

// NOTE: Unix Timestamp를 로컬 시간으로 포매팅 된 string 필요 시 사용
export const formatUnixToLocalDateTime = (
  date: number,
  template: string = "DD/MM/YYYY, HH:mm",
): string => dayjs.unix(date).format(template);

// NOTE: 로컬 시간으로 포매팅 된 string 필요 시 사용
export const formatLocalDateTime = (
  date: DateArgs,
  template: string = "DD/MM/YYYY",
): string => dayjs(date).format(template);

// NOTE: ICT 시간으로 포매팅 된 string 필요 시 사용
export const formatICTDateTime = (
  date: DateArgs,
  template: string = "DD/MM/YYYY, HH:mm",
): string => dayjs.utc(date).tz("Asia/Vientiane").format(template);

export const formatPeriodICTToUTC = (
  type: "startDate" | "endDate",
  localDate: string,
) => {
  if (!localDate) return "";

  const date = dayjs
    .utc(localDate, "DD/MM/YYYY")
    .tz("Asia/Vientiane")
    .subtract(calcHourDiffICTWithUTC0(), "h");

  switch (type) {
    case "startDate":
      return date.toISOString();

    case "endDate":
      return date.add(1, "day").toISOString();
  }
};

export const formatPeriodToUTC = (
  type: "startDate" | "endDate",
  localDate: string,
  isLocalTime: boolean = false,
) => {
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

export const formatICTToUTC0 = (date: dayjs.Dayjs): string =>
  dayjs(
    dayjs(date, "DD/MM/YYYY HH:mm").subtract(calcHourDiffICTWithUTC0(), "h"),
  ).format("YYYY-MM-DDTHH:mm:ss.sss[Z]");

export const addZeroFirstString = (
  num: number,
): string | number | undefined => {
  if (num === undefined) return;

  return (num + "").length === 1 ? `0${num}` : num;
};

export const onlyWithColonsInTime = (v: string): string => {
  // eslint-disable-next-line
  const regex = /[^0-9\:]/g;

  return v.replaceAll(regex, "");
};
