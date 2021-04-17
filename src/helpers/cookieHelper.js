export const getJsonCookies = () => {
  let cookiesString = document.cookie;
  let jsonCookies;

  let cookiesStringTrim = cookiesString.replace(" ", "");
  let keyEqualValueCookiesArray = cookiesStringTrim.split(";");

  keyEqualValueCookiesArray.forEach((keyEqualValueCookie) => {
    let keyValue = keyEqualValueCookie.split("=");
    jsonCookies = { ...jsonCookies, [keyValue[0]]: keyValue[1] };
  });

  return jsonCookies;
};
