
export class CommonURL {

  static BASE_URL: string = 'https://preprod.tagloy.com/v1/';

  static URL_LOGIN:string = 'Brand/login' ;

  static LOCAL_STORAGE_USER_KEY: string = 'user';
  static LOCAL_STORAGE_USER_LIST: string = 'user_list';
  static LOCAL_STORAGE_SESSION_TIMESTAMP: string = 'session_timestamp';

  static BASE_URL: string = 'https://taglockapi.tagloy.com/';
  // static BASE_URL: string = 'http://13.232.206.57/';


  static LIMIT_USER_SELECTION_COUNT = 30;
  static SESSION_TIMEOUT:number = 12 * 60 * 60 * 1000;
  //static SESSION_TIMEOUT:number = 30 * 1000;
}
