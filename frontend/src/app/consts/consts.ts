export class Consts{
  static Api = class {
     static ROOT = 'http://localhost:3000/api';
  }
  static Offer = class {
    static URL = "/offers";
    static TITLE = "Offers";
    static CREATE_URL = "/offers/create"
  }
  static User = class {
    static URL = "/users";
    static TITLE = "Users";
  }
  static Oauth = class{
    static LOGIN = '/login';
    static LOGOUT = '/logout';
    static OAUTH = "/oauth";
  }
}
