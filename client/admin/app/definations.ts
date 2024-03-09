export type CurrentUser = {
  _id: string;
};

export type AuthValue = {
  currentUser: CurrentUser | undefined;
  setCurrentUser: Function;
};
