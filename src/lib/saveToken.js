import tokenStore from "../stores/token.store";

const saveToken = (token) => {
  //   console.log("saveToken", token);
  // TODO: Make sure token is valid before continuing

  tokenStore.set(token);
};

export default saveToken;
