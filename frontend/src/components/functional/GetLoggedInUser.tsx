export function getLoggedInUser() {
      const token = localStorage.getItem('token') || '';
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(atob(base64));
}

export function getUserLanguage() {
      if (navigator.languages != undefined) 
        return navigator.languages[0]; 
      return navigator.language;
}