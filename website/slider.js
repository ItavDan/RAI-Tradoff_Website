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

window.makeSlider = function () {

  var width = 300
  var height = 30

  var x = d3.scaleLinear()
    .domain([1, -.001])
    .range([0, width])
    .clamp(true)

  var rv = {}
  rv.threshold = .5
  rv.setSlider = makeSetSlider(patients, 'threshold')

  var allActiveSel = d3.selectAll('.threshold-rect')
  var allHandleSel = d3.selectAll('.threshold-handle')

  function makeSetSlider(data, key) {
    var drag = d3.drag()
      .on('drag', function (d) {
        var val = x.invert(d3.mouse(this)[0])
        rv.manualThreshold = val
        updateThreshold(val)
        if (key == 'threshold') svg.classed('no-blink', 1)
      })

    var svg = d3.select('.slider.' + key).html('')
      .append('svg').at({ width, height })
      .call(drag)
      .st({ cursor: 'pointer' })

    svg.append('rect').at({ width, height, fill: lcolors.well })

    var rectSel = svg.append('rect.threshold-rect')
      .at({ width, height, fill: lcolors.sick })

    var handleSel = svg.append('g.threshold-handle')
    handleSel.append('text.cursor')
      .text('▲')
      .at({ textAnchor: 'middle', fontSize: 25, y: height, dy: '.8em' })
    handleSel.append('circle')
      .at({ cy: height, r: 30, fill: 'rgba(0,0,0,0)' })

    var labelText = 'Model Aggressiveness →'
    
    svg.append('text.axis').text(labelText)
      .at({ y: height / 2, dy: '.33em', dx: 10 })
      .st({ pointerEvents: 'none' })

    function updateThreshold(threshold, skipDom) {
      rv[key] = threshold
      data.forEach(d => d.threshold = threshold)

      mini.updateAll()
      metrics.updateAll()

      rectSel.at({ width: x(threshold) })
      handleSel.translate(x(threshold), 0)

      if (skipDom) return

      if (key == 'threshold') {
        allActiveSel.at({ width: x(threshold) })
        allHandleSel.translate(x(threshold), 0)
      }

      window.updateSel()
    }

    return updateThreshold
  }

  return rv
}

if (window.init) window.init()
