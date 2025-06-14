import { googleLogout } from "@react-oauth/google";
import { api } from "../../axios/axios";

//fetch Facebook user info
const fbFetchUserinfo = () => {
  window.FB.api(
    "/me",
    { fields: "name, email, picture.type(large)" },
    function (response) {
      console.log("Fetching facebook user info..");
      console.log(response);
    }
  );
};

// login Facebook
const fbLoginUser = () => {
  // Trigger Facebook login
  window.FB.login(function (response) {
    console.log("Logging in with facebook ...");
    if (response.authResponse) {
      fbFetchUserinfo();
    }
  });
};

//facebook OAuth - login with facebook
export const handleFacebookLogin = () => {
  try {
    //Login status
    window.FB.getLoginStatus(function (response) {
      console.log(response);
      if (response.status === "connected") {
        console.log("User already connected with facebook");
        fbFetchUserinfo();
      } else {
        fbLoginUser();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const hanldeFacebookLogout = () => {
  //Logout
  window.FB.logout((res) => {
    console.log("FB Logout Successfully ", res);
  });
};

export const handleGoogleLogout = () => {
  //Logout
  console.log("loggin out google");
  googleLogout();
};

// User Login
export const handleUserLogin = async (credentials) => {
  try {
    const { data } = await api.post("/api/login", credentials);
    localStorage.setItem("user", JSON.stringify(data.data));
    localStorage.setItem("auth", data.data.access_token);
    return data;
  } catch (error) {
    throw new Error(error.response?.data.message || error.message);
  }
};

// User Register/signUp
export const handleUserSignUp = async (credentials) => {
  try {
    const { data } = await api.post("/api/register", credentials);
    return data;
  } catch (error) {
    if (error.response.data.message && typeof error.response.data.message!=="string" ) {
      // console.log("response ", error.response)
      //Error Object
      const errorObj = error.response.data.message;
      // Error object's key OR keys
      const errorObjKey = Object.keys(error.response.data.message)[0];
      //Array of Error message - getting first message
      throw new Error(errorObj[errorObjKey][0]);
    }

    throw new Error(error.message);
  }
};

// Forget Password
export const handleForgetPassword = async (credentials) => {
  try {
    // const { data } = await api.post("/api/forget-password", credentials);
    const { data } = await api.post(
      `/api/forget-password?email=${credentials.email}`
    );
    return data;
  } catch (error) {
    console.log(error);
    if (error.response.data.errors) {
      //Error Object
      const errorObj = error.response.data.errors;
      // Error object's key OR keys
      const errorObjKey = Object.keys(error.response.data.errors)[0];
      //Array of Error message - getting first message
      throw new Error(errorObj[errorObjKey][0]);
    }
    if (
      error.response.data.message &&
      typeof error.response.data.message === "string"
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
// Reset Password - Verify token
export const handleForgetTokenVerification = async (token) => {
  try {
    const { data } = await api.post(`/api/verify-token?token=${token}`);
    return data;
  } catch (error) {
    if (
      error.response.data.message &&
      typeof error.response.data.message === "string"
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
// Reset Password - Change Password
export const handlePostResetPassword = async (token, credentials) => {
  try {
    // const { data } = await api.post(`/api/resetpassword?token=${token}`, credentials);
    const { data } = await api.post(
      `/api/reset-password?token=${token}&password=${credentials.password}&password_confirmation=${credentials.password_confirmation}`
    );
    return data;
  } catch (error) {
    if (
      error.response.data.message &&
      typeof error.response.data.message === "string"
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

// Email Verification
export const handleEmailVerification = async ({
  id,
  expires,
  hash,
  signature,
}) => {
  try {
    const { data } = await api.get(
      `/api/email-verification/${id}?expires=${expires}&hash=${hash}&signature=${signature}`
    );
    return data;
  } catch (error) {
    if (error.response.data.errors) {
      //Error Object
      const errorObj = error.response.data.errors;
      // Error object's key OR keys
      const errorObjKey = Object.keys(error.response.data.errors)[0];
      //Array of Error message - getting first message
      throw new Error(errorObj[errorObjKey][0]);
    }
    if (
      error.response.data.message &&
      typeof error.response.data.message === "string"
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

// Resend Email Verification Link
export const handleResendEmailVerificationLink = async (email) => {
  try {
    const { data } = await api.post(`/api/email-verification?email=${email}`);
    return data;
  } catch (error) {
    if (error.response.data.errors) {
      //Error Object
      const errorObj = error.response.data.errors;
      // Error object's key OR keys
      const errorObjKey = Object.keys(error.response.data.errors)[0];
      //Array of Error message - getting first message
      throw new Error(errorObj[errorObjKey][0]);
    }
    if (
      error.response.data.message &&
      typeof error.response.data.message === "string"
    ) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
// Become Chef - Register
export const handleChefSignUp = async (credentials) => {
  try {
    const { data } = await api.post("/api/register", credentials, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    if (error.response) {
      //Error Object
      const errorObj = error.response.data.errors;
      // Error object's key OR keys
      const errorObjKey = Object.keys(error.response.data.errors)[0];
      //Array of Error message - getting first message
      throw new Error(errorObj[errorObjKey][0]);
    }

    throw new Error(error.message);
  }
};

export const handleShowProfile = async (token) => {
  try {
    const { data } = await api.get("/api/show-profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log("error while calling show profile ", error);
  }
};

export const handleUpdateProfile = async (token, credentials) => {
  try {
    const { data } = await api.post("/api/update-profile", credentials, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message ? error.message : "Something went wrong");
  }
};

export const handleUpdateAddress = async (token, credentials) => {
  try {
    const { data } = await api.post("/api/update-address", credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log("error of update address ", error);
    if (error.response) {
      //Error Object
      const errorObj = error.response.data.message;
      // Error object's key OR keys
      const errorObjKey = Object.keys(error.response.data.message)[0];
      //Array of Error message - getting first message
      throw new Error(errorObj[errorObjKey][0]);
    }
    throw new Error(error.message ? error.message : "Something went wrong");
  }
};
