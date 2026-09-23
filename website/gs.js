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

window.makeGS = function () {
  var gs = {}
  var bodySel = d3.select('body')
  var prevSlideIndex = -1

  function updateSlide(i) {
    var slide = slides[i]
    if (!slide) return
    slides.curSlide = slide // <--- MOVED TO TOP

    var currentFactor = typeof slide.factor === 'function' ? slide.factor() : slide.factor;
    window.updateDataSourceFromFactor(currentFactor)

    gs.prevSlide = gs.curSlide
    gs.curSlide = slide

    var dur = gs.prevSlide ? 500 * 1 : 0

    sel.personSel.transition().duration(dur)
      .translate(d => d.pos[slide.pos])

    sel.textSel.transition().duration(dur)
      .at({ fill: slide.textFill })

    sel.rectSel.transition('opacity').duration(dur)
      .at({ opacity: slide.rectOpacity })

    var currentThreshold = typeof slide.threshold === 'function' ? slide.threshold() : slide.threshold;

    if (!slide.animateThreshold) {
      slider.setSlider(currentThreshold, true)
      bodySel.transition('gs-tween')
    } else {
      bodySel.transition('gs-tween').duration(dur * 2)
        .attrTween('gs-tween', () => {
          var i = d3.interpolate(slider.threshold, currentThreshold)
          return t => {
            slider.setSlider(i(t))
          }
        })
    }

    sel.truthAxis.transition().duration(dur)
      .st({ opacity: slide.truthAxisOpacity })

    sel.mlAxis.transition().duration(dur)
      .st({ opacity: slide.mlAxisOpacity })

    sel.botAxis.transition().duration(dur)
      .translate(slide.botAxisY, 1)

    prevSlideIndex = i
  }

  gs.graphScroll = d3.graphScroll()
    .container(d3.select('.container-1'))
    .graph(d3.selectAll('container-1 #graph'))
    .eventId('uniqueId1')
    .sections(d3.selectAll('.container-1 #sections > div'))
    .offset(innerWidth < 900 ? 300 : 520)
    .on('active', updateSlide)

  return gs
}

if (window.init) window.init()
