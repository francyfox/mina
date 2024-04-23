export class TentModel {
  personCount = 0
  tentNo = 0
  doorPositions = []

  constructor(personCount, tentNo, doorPositions) {
    this.personCount = personCount
    this.tentNo = tentNo
    this.doorPositions = doorPositions
  }
}