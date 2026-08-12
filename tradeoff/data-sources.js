window.calcFactor = function () {
    var factor = 0
    var dataSources = d3.select("#datasources").selectAll('[type=checkbox]')
    dataSources.each(function (d, i) {
        source = d3.select(this)
        if (source.prop("checked")) {
            factor += DATA_SOURCE_FACTROS[source.attr("name")]
        }
    })
    return factor
}

window.updateDataSourceFromFactor = function (factor) {
    window.updateGrades(factor)
    metrics.updateAll()
    window.updateSel()
}

window.updateDataSources = function (e, d) {
    factor = window.calcFactor()
    window.updateDataSourceFromFactor(factor)
}

if (window.init) window.init()
