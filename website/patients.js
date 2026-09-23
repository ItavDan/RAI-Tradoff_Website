/* Copyright 2020 Google LLC. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

Math.clip = function (number, min, max) {
  return Math.max(min, Math.min(number, max));
};


window.makePatients = function () {
  var seed = new Math.seedrandom('he4a15')
  // var rand = d3.randomUniform.source(seed)(0, 1)
  var rand = d3.randomNormal.source(seed)(BASE_MEAN, BASE_STD)
  var letters = 'abcdefgijlmnopqrsuvwxyz'
  letters = (letters + letters.toUpperCase()).split('')

  // var nSickCols = 6
  // var childSickCols = 8
  var nSickCols = 3
  var childSickCols = 5

  var adultSickCols = nSickCols * 2 - childSickCols

  var patients = d3.range(nCols * nCols).map(i => {
    var letter = letters[~~d3.randomUniform.source(seed)(0, letters.length)()]

    var isChild = i % 2 == 0
    var isSick = i < (isChild ? childSickCols : adultSickCols) * nCols
    // var score = isSick * .5 + rand()
    var internal_score = rand()
    var score = Math.clip(internal_score, 0, 1)
    var pos = {}

    return { letter, isSick, isChild, score, internal_score, pos }
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
      // d.pos.all = spreadIJ.map(d => d * c.width / 10)
      d.pos.all = spreadIJ.map(d => d * c.width / 8)
    })
  })

  d3.nestBy(patients, d => d.isSick + '-' + d.isChild).forEach(group => {
    var isSick = group[0].isSick
    var isChild = group[0].isChild

    var sickCols = isChild ? childSickCols : adultSickCols
    var cols = isSick ? sickCols : nCols - sickCols
    var xOffset = isSick ? 0 : sickCols
    var yOffset = isChild ? nCols / 2 + 2 : 0

    group.forEach((d, i) => {
      d.pos.sexIJ = [cols - 1 - (i % cols) + xOffset, ~~(i / cols) + yOffset]
      d.pos.sexGroupIJ = [cols - 1 - (i % cols) + xOffset, ~~(i / cols)]
      var spreadIJ = d.pos.sexIJ.slice()
      if (!d.isSick) spreadIJ[0] += .1
      // d.pos.sex = spreadIJ.map(d => d * c.width / 10)
      d.pos.sex = spreadIJ.map(d => d * c.width / 8)
    })
  })

  patients.childOffsetJ = nCols / 2 + 2
  // patients.childOffsetPx = patients.childOffsetJ * c.width / 10
  patients.childOffsetPx = patients.childOffsetJ * c.width / 8

  patients.adultSickCols = adultSickCols
  patients.childSickCols = childSickCols

  // patients.colWidth = c.width / 10
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
