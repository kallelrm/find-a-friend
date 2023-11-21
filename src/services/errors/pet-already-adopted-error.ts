export class PetAlreadyAdoptedError extends Error {
  constructor() {
    super('Pet already adopted')
  }
}
