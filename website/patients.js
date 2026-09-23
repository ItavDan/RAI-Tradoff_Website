Math.clip = function (number, min, max) {
  return Math.max(min, Math.min(number, max));
};

window.makePatients = function () {
  var seed = new Math.seedrandom('he4a15')
  var rand = d3.randomNormal.source(seed)(BASE_MEAN, BASE_STD)
  var letters = 'abcdefgijlmnopqrsuvwxyz'
  letters = (letters + letters.toUpperCase()).split('')

  var nSickCols = 3

  var patients = d3.range(nCols * nCols).map(i => {
    var letter = letters[~~d3.randomUniform.source(seed)(0, letters.length)()]
    var isSick = i < nSickCols * nCols
    var internal_score = rand()
    var score = Math.clip(internal_score, 0, 1)
    var pos = {}

    return { letter, isSick, score, internal_score, pos }
  })

  patients = _.sortBy(patients, d => -d.score)
  d3.nestBy(patients, d => d.isSick).forEach(group => {
    var isSick = group[0].isSick

    var sickCols = nSickCols
    var cols = isSick ? sickCols : nCols - sickCols
    var xOffset = isSick ? 0 : sickCols

    group.forEach((d, i) => {
      d.pos.allIJ = [cols - 1 - (i % cols) + xOffset, ~~(i / cols)]
      var spreadIJ = d.pos.allIJ.slice()
      if (!d.isSick) spreadIJ[0] += .1
      d.pos.all = spreadIJ.map(d => d * c.width / 8)
    })
  })

  patients.colWidth = c.width / 8
  patients.rand = rand
  return patients
}

window.updateScores = (factor) => {
  sick_mean = window.BASE_MEAN * Math.log2(1 + factor)
  patients.map(patient => {
    if (patient.isSick) {
      patient.score = Math.clip(patient.internal_score + sick_mean, 0, 1)
    }
  })
}

if (window.init) window.init()
