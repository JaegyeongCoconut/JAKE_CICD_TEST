import { enc, HmacSHA256, HmacSHA512, SHA256, SHA512 } from "crypto-js";

const makeCryptoPassword =
  (sha: "256" | "512") =>
  (password: string): string => {
    const shaFunction = sha === "256" ? SHA256 : SHA512;

    return shaFunction(password).toString(enc.Hex);
  };

export const encryptWithSha256 = makeCryptoPassword("256");
export const encryptWithSha512 = makeCryptoPassword("512");

type MakeHmacApiHeadersReturnType = {
  "x-api-data": string;
  "x-api-signature": string;
};

const makeHmacApiHeaders =
  (sha: "256" | "512") =>
  (hmacKey: string): MakeHmacApiHeadersReturnType => {
    const date = `${Date.now()}`;
    const shaFunction = sha === "256" ? HmacSHA256 : HmacSHA512;

    const signature = shaFunction(date, hmacKey).toString(enc.Hex);

    return { "x-api-data": date, "x-api-signature": signature };
  };

export const makeHmacApiHeaders256 = makeHmacApiHeaders("256");
export const makeHmacApiHeaders512 = makeHmacApiHeaders("512");
