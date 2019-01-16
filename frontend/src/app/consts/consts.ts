export class Consts{
  static Api = class {
     static ROOT = 'http://localhost:3000/api';
  }
  static Offer = class {
    static URL = "/offers";
    static TITLE = "Oferty";
    static CREATE_URL = "/offers/create"
    static USER_OFFER_LIST = "/offers/user"
  }
  static User = class {
    static URL = "/users";
    static TITLE = "Użytkownicy";
  }
  static Oauth = class{
    static LOGIN = '/login';
    static LOGOUT = '/logout';
    static OAUTH = "/oauth";
  }
}
