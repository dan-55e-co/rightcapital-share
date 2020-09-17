function start() {
  var url = window.location.href
  var uriIndex = url.lastIndexOf("/")
  var urlParts = url.substring(uriIndex + 1).split("#")

  makeSelectable()

  if (urlParts[0] === "asset-allocation") {
    endableTargetCategoryMix()
  } else if (urlParts[0] === "cash-flows") {
    getTableTotals(urlParts[1])
  }
}

function getTableTotals(urlPart) {
  var cashFlowData = angular.element("button").scope().cashFlow.data

  Object.values(cashFlowData).forEach(function (table) {
    getData(table, urlPart)
  })
}

function setTableTotals(data) {
  var totalRow = new Array(data[0].length).fill(0)
  totalRow[0] = ""
  totalRow[1] = data[data.length - 1][1]
  data.forEach(function (r) {
    for (var col = 2; col < data[0].length; col++) {
      totalRow[col] = totalRow[col] + r[col]
    }
  })

  var headers = document.querySelectorAll(".custom-header-cell")

  totalRow.forEach(function (colTotal, index) {
    var s = document.createElement("div")
    s.style.fontSize = "12px"
    s.innerText = colTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    var h = document.createElement("div")
    h.style.fontSize = "12px"
    if (headers[index]) {
      h.innerText = headers[index].innerText
      headers[index].style.flexFlow = "column"
      headers[index].innerText = ""
      headers[index].append(h)
      headers[index].append(s)
    }
  })
}

function getData(obj, objId) {
  if (obj.id === objId) {
    setTableTotals(obj.table.data)
  } else if (obj.hasOwnProperty("children")) {
    obj.children.forEach(function (table) {
      return getData(table, objId)
    })
  }
}

function endableTargetCategoryMix() {
  document.getElementsByName(
    "investment_target_category_mix_id"
  )[0].disabled = false
}

function makeSelectable() {
  var unselectables = document.querySelectorAll('[unselectable="on"]')
  Array.from(unselectables).forEach(function (item) {
    item.removeAttribute("unselectable")
  })

  var unselectables = document.querySelectorAll(".ag-unselectable")
  Array.from(unselectables).forEach(function (item) {
    item.classList.remove("ag-unselectable")
  })
}

start()

window.addEventListener("hashchange", function () {
  start()
})
