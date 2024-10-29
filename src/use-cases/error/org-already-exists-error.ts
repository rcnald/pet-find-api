export class OrgAlreadyExists extends Error {
  constructor() {
    super("ORG already exists!")
  }
}
