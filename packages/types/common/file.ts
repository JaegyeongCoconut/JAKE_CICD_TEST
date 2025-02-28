export interface FileRequestType {
  fileKey: string;
  fileName: string;
}

export interface S3PresignedServerModel {
  config: any;
  data: {
    url: string;
    fields: {
      key: string;
      bucket: string;
      "X-Amz-Algorithm": string;
      "X-Amz-Credential": string;
      "X-Amz-Date": string;
      Policy: string;
      "X-Amz-Signature": string;
    };
  };
}
