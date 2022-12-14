/**
 * 登录表单类型声明
 */
export interface LoginForm {
  username: string;
  password: string;
  grant_type: string;
}

/**
 * 登录响应类型声明
 */
export interface LoginResult {
  access_token: string;
  token_type: string;
}

