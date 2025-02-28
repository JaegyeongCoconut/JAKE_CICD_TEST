import { enc, HmacSHA256, SHA256 } from "crypto-js";

// NOTE: sha256으로 비밀번호 만들고, hex 형식으로 string 만듬
export const makeCryptoPassword = (password: string): string =>
  SHA256(password).toString(enc.Hex);

export const makeHmacApiHeader = (): {
  "x-api-data": string;
  "x-api-signature": string;
} => {
  if (!import.meta.env.VITE_HMAC_KEY) {
    throw new Error("VITE_HMAC_KEY is not defined");
  }

  const data = `${Date.now()}`;
  const signature = HmacSHA256(data, import.meta.env.VITE_HMAC_KEY).toString(
    enc.Hex,
  );

  return { "x-api-data": data, "x-api-signature": signature };
};
