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

window.makeSel = function () {
  var s = c.width / (nCols - 2) - 1

  var personSel = c.svg.appendMany('g', patients)
  var rectSel = personSel.append('rect')
    .at({
      height: s,
      width: s,
      x: -s / 2,
      y: -s / 2,
    })

  var textSel = personSel.append('text.weepeople')
    .text(d => d.letter)
    .at({ fontSize: 42, dy: '.33em', textAnchor: 'middle' })
    .st({ stroke: d => d.isSick ? dcolors.sick : dcolors.well })

  addSwoop(c)

  var botAxis = c.svg.append('g').translate(c.width + 150, 1)
  var truthAxis = botAxis.append('g.axis').translate([0, 0])

  truthAxis.append('text').text('Truth (developed cancer within 2 years)')
    .at({ textAnchor: 'middle', fontWeight: 500, x: s * 2.65 })

  truthAxis.append('g').translate([45, 22])
    .append('text').text('Yes').parent()
    .append('text.weepeople').text('k')
    .at({ fontSize: 34, x: 22, y: 5 })
    .st({ fill: colors.sick })

  truthAxis.append('g').translate([95, 22])
    .append('text').text('No').parent()
    .append('text.weepeople').text('d')
    .at({ fontSize: 34, fill: colors.well, x: 22, y: 5 })
    .st({ fill: colors.well })


  var mlAxis = botAxis.append('g.axis').translate([220, 0])

  mlAxis.append('text').text('ML Prediction (flagged at risk)')
    .at({ textAnchor: 'middle', fontWeight: 500, x: s * 2.8 })

  mlAxis.append('g').translate([35, 22])
    .append('text').text('Yes').parent()
    .append('rect')
    .at({ width: s * .7, height: s * .7, fill: lcolors.sick, x: 28, y: -17 })

  mlAxis.append('g').translate([100, 22])
    .append('text').text('No').parent()
    .append('rect')
    .at({ width: s * .7, height: s * .7, fill: lcolors.well, x: 28, y: -17 })

  return { personSel, textSel, rectSel, truthAxis, mlAxis, botAxis }
}

window.updateSel = () => {
  var isPerfect = window.slides && window.slides.curSlide ? window.slides.curSlide.isPerfectWorld : false;
  
  sel.rectSel.at({ fill: d => {
    if (isPerfect) return d.isSick ? lcolors.sick : lcolors.well;
    return d.score > d.threshold ? lcolors.sick : lcolors.well;
  }})

  sel.textSel
    .st({
      strokeWidth: d => {
        var isMistake = d.score > d.threshold !== d.isSick;
        var showMistakes = window.slides && window.slides.curSlide ? window.slides.curSlide.showMistakes : false;
        return isMistake && showMistakes ? .6 : 0;
      }
    })
}

if (window.init) window.init()
