function isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }

  export default isValidURL;