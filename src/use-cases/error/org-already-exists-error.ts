export class OrgAlreadyExistsError extends Error {
  constructor() {
    super("ORG already exists!")
  }
}
