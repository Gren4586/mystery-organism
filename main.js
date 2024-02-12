// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (speciNum, dnaArr) => {
  return {
    specimenNum: speciNum,

    dna: dnaArr,

    mutate() {
      let oldStrand = this.dna;
      this.dna[Math.floor(Math.random() * 15)] = returnRandBase();
      let newStrand = this.dna;
      if (oldStrand === newStrand) {
        this.dna[Math.floor(Math.random() * 15)] = returnRandBase();
      }
    },

    compareDNA(subject) {
      let sharedBases = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === subject.dna[i]) {
          sharedBases++;
        }
      }

      const sharedPercentage = (sharedBases / this.dna.length) * 100;
      console.log(`Specimen ${this.specimenNum} and specimen ${subject.specimenNum} share ${sharedPercentage.toFixed(2)}% DNA.`)
    },

    willLikelySurvive() {
      let goodBases = 0;
      
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          goodBases++;
        }
      }
      
      const goodBasePercentage = (goodBases / this.dna.length) * 100;

      if (goodBasePercentage >= 60) {
        return true;
      } else {
        return false;
      }
    }
  }
}

let survivingSpecimens = [];
let idCounter = 1;

while (survivingSpecimens.length < 30) {
  let newSpeci = pAequorFactory(idCounter, mockUpStrand());
  if (newSpeci.willLikelySurvive()) {
    survivingSpecimens.push(newSpeci);
  }
  idCounter++;
}
