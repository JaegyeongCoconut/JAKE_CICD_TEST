import { v4 as uuidv4 } from "uuid";

export const makeBase64ImageToFile = (base64Image: string) => {
  const mimeType = base64Image.split(";")[0].split(":")[1];
  const extension = mimeType.split("/")[1];
  const byteString = atob(base64Image.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: mimeType });
  const fileName = `${uuidv4()}.${extension}`;
  const file = new File([blob], fileName, { type: mimeType });

  return { file, fileName };
};
