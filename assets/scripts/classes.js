'use strict';

class User {
    #id;
    #fullName;
    #userName;
    #email;
  
    constructor(id, fullName, userName, email) {
      this.#id = id;
      this.#fullName = fullName;
      this.#userName = userName;
      this.#email = email;
    }
  
    get id() {
      return this.#id;
    }
  
    get fullName() {
      return this.#fullName;
    }
  
    get userName() {
      return this.#userName;
    }
  
    get email() {
      return this.#email;
    }
  
    getInfo() {
      return `${this.#id}, ${this.#fullName}, ${this.#userName}, ${this.#email}`;
    }
  }

  class Subscriber extends User {
    #pages = [];
    #groups = [];
    #canMonetize = false;
  
    constructor(
    id,
    fullName,
    userName,
    email,
    pages,
    groups,
    canMonetize
    ) {
      super(id, fullName, userName, email);
      this.#pages = pages;
      this.#groups = groups;
      this.#canMonetize = canMonetize;
    }
  
    get pages() {
      return this.#pages;
    }
  
    get groups() {
      return this.#groups;
    }
  
    get canMonetize() {
      return this.#canMonetize;
    }
  
    getInfo() {
      return `${super.getInfo()}, ${this.#pages}, ${this.#groups}, ${this.#canMonetize}`;
    }
  }

export default User;
export { Subscriber } ;