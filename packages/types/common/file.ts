export interface S3PresignedServerModel {
  config: any;
  data: {
    fields: {
      key: string;
      bucket: string;
      Policy: string;
      "X-Amz-Algorithm": string;
      "X-Amz-Credential": string;
      "X-Amz-Date": string;
      "X-Amz-Signature": string;
    };
    url: string;
  };
}
