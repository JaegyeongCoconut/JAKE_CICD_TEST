export interface GetVerifyCodeQueryModel {
  email: string;
}

export interface CheckVerifyCodeQueryModel extends GetVerifyCodeQueryModel {
  authCode: string;
}

export interface UpdatePasswordWithVerifyQueryModel
  extends CheckVerifyCodeQueryModel {
  password: string;
  token?: string;
}
