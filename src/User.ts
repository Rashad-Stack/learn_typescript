export default class User {
  constructor(public username: string, public password: string) {
    this.username = username;
    this.password = password;
  }

  logout() {
    console.log(`${this.username} logout`);
  }
}

export function userHelper() {
  console.log("userHelper");
}
