window.calcFactor = function () {
    var factor = 0
    var dataSources = d3.select("#datasources").selectAll('[type=checkbox]')
    dataSources.each(function (d, i) {
        var source = d3.select(this)
        if (source.prop("checked")) {
            factor += DATA_SOURCE_FACTROS[source.attr("name")]
        }
    })
    return factor
}

window.updateDataSourceFromFactor = function (factor) {
    window.updateScores(factor)
    metrics.updateAll()
    window.updateSel()
}

window.updateDataSources = function (e, d) {
    var factor = window.calcFactor()
    window.updateDataSourceFromFactor(factor)
}

d3.selectAll("[type='checkbox']").on("change", window.updateDataSources)

if (window.init) window.init()
