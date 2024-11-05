export class PetIsAlreadyUpForAdoptionError extends Error {
  constructor() {
    super("Pet is already up for adoption!")
  }
}
