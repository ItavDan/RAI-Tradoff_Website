window.makeMetrics = () => {
    var metricsSel = d3.selectAll('.metrics').html('').each(addMetrics).st({ overflow: 'visible' })

    function addMetrics() {
        var metricsSel = d3.select(this)

        var tp = {}
        var fp = {}
        var fn = {}
        var tn = {}


        // < wee class="sick bg-sick metric" aria - hidden="true" font - size="66" > g</wee >
        //     <span class="equation" id="tp">54</span>

        //     <wee class="well bg-sick" aria-hidden="true">a</wee>
        //     <span class="equation" id="fp">13</span>

        //     <br>

        //     <wee class="sick bg-well" aria-hidden="true">c</wee>
        //     <span class="equation" id="fn">1</span>

        //     <wee class="well bg-well" aria-hidden="true">f</wee>
        //     <span class="equation" id="tn">3</span>
        // </div> -->
        // .text(d => d.letter)
        // .at({ fontSize: d => d.isMale ? 26 : 34, dy: '.33em', textAnchor: 'middle' })
        // .st({ stroke: d => d.isSick ? dcolors.sick : dcolors.well })



        // window.colors = {
        //     well: d3.interpolate(colors.well, '#fff')(.5),
        //     sick: d3.interpolate(colors.sick, '#fff')(.2),
        // }

        // window.lcolors = {
        //     well: d3.interpolate(colors.well, '#fff')(.5),
        //     sick: d3.interpolate(colors.sick, '#fff')(.35)
        // }
        // window.llcolors = {
        //     well: d3.interpolate(colors.well, '#fff')(.5),
        //     sick: d3.interpolate(colors.sick, '#fff')(1)
        // }
        // window.dcolors = {
        //     well: d3.interpolate(colors.well, '#000')(.65),
        //     sick: d3.interpolate(colors.sick, '#000')(.65)
        // }


        // metricsSel.append('text.weepeople')
        //     .text("g").at({ fontSize: 100, textAnchor: 'middle' })
        //     .st({ stroke: dcolors.sick, fill: dcolors.sick })


        metricsSel.append('wee').text('d')
            .at({ class: "metrics sick bg-sick" })
            .style("font-size", "30px")
        var tpSel = metricsSel.append('span.equation').style("font-size", "20px")

        metricsSel.append('wee').text('d')
            .at({ class: "metrics well bg-sick" })
            .style("font-size", "30px")
        var fpSel = metricsSel.append('span.equation').style("font-size", "20px")

        metricsSel.append('wee').text('d')
            .at({ class: "metrics sick bg-well" })
            .style("font-size", "30px")

        var fnSel = metricsSel.append('span.equation').style("font-size", "20px")

        metricsSel.append('wee').text('d')
            .at({ class: "metrics well bg-well" })
            .style("font-size", "30px")
        var tnSel = metricsSel.append('span.equation').style("font-size", "20px")

        function update() {
            tp.value = students.filter(d => (d.grade > d.threshold) & d.isSick).length
            fp.value = students.filter(d => (d.grade > d.threshold) & !d.isSick).length
            fn.value = students.filter(d => (d.grade <= d.threshold) & d.isSick).length
            tn.value = students.filter(d => (d.grade <= d.threshold) & !d.isSick).length

            tpSel.text(tp.value)
            fpSel.text(fp.value)
            fnSel.text(fn.value)
            tnSel.text(tn.value)
        }

        metricsSel.datum({ update })

    }

    function updateAll() {
        metricsSel.each(d => d.update())
    }

    return { updateAll }
}







if (window.init) window.init()
