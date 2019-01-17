export class Consts{
  static Api = class {
     static ROOT = 'http://localhost:3000/api';
  };
  static Offer = class {
    static URL = "/offers";
    static TITLE = "Oferty";
    static CREATE_URL = "/offers/create";
    static EDIT_URL = "/offers/edit";
    static USER_OFFER_LIST = "/offers/user"
  };
  static User = class {
    static URL = "/users";
    static TITLE = "Użytkownicy";
  };
  static Oauth = class{
    static LOGIN = '/login';
    static LOGOUT = '/logout';
    static OAUTH = "/oauth";
    static REGISTER = '/register'
  };
  static Comment = class {
    static URL = "/comments";
    static TITLE = "Komentarze";
    static CREATE_URL = "/comments/create";
    static EDIT_URL = "/comments/edit";
    static OFFER_Comment_LIST = "/comments/offer"
  }
}
