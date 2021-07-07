export class UserModel {
  private id: number;
  private username: string;
  private password: string;
  private email: string;
  private createdAt: Date;

  public constructor() {
    this.id = 0;
    this.username = '';
    this.password = '';
    this.email = '';
    this.createdAt = new Date();
  }

  public getId(): number {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): UserModel {
    this.username = username;
    return this;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): UserModel {
    this.password = password;
    return this;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): UserModel {
    this.email = email;
    return this;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public hydrate(userData: any): UserModel {
    for (const property in userData) {
      if (this.hasOwnProperty(property)) {
        this[property] = userData[property];
      }
    }
    return this;

    // A éviter absolument
    Object.assign(this, userData);
  }
}
