function takeAction() {
  var url = window.location.href
  var lastSlashInUri = url.lastIndexOf("/")
  var urlParts = url.substring(lastSlashInUri + 1).split("#")

  makeSelectable()

  if (urlParts[0] === "asset-allocation") {
    enableTargetCategoryMix()
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
  totalRow[0] = data[data.length - 1][0]
  totalRow[1] = data[data.length - 1][1]
  data.forEach(function (r) {
    for (var col = 2; col < data[0].length; col++) {
      totalRow[col] = totalRow[col] + r[col]
    }
  })

  var headers = document.querySelectorAll(".custom-header-cell")

  totalRow.forEach(function (colTotal, index) {
    var totalElement = document.createElement("div")
    totalElement.style.fontSize = "12px"
    if (index === 0) {
      totalElement.innerText = colTotal
    }
    totalElement.innerText = colTotal.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    var headerElement = document.createElement("div")
    headerElement.style.fontSize = "12px"
    if (headers[index]) {
      headerElement.innerText = headers[index].innerText
      headers[index].style.flexFlow = "column"
      headers[index].innerText = ""
      headers[index].append(headerElement)
      headers[index].append(totalElement)
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

function enableTargetCategoryMix() {
  document.getElementsByName(
    "investment_target_category_mix_id"
  )[0].disabled = false
}

function makeSelectable() {
  var unselectables = document.querySelectorAll('[unselectable="on"]')
  Array.from(unselectables).forEach(function (item) {
    item.removeAttribute("unselectable")
  })

  var agUnselectables = document.querySelectorAll(".ag-unselectable")
  Array.from(agUnselectables).forEach(function (item) {
    item.classList.remove("ag-unselectable")
  })
}

// Now run code
takeAction()

window.addEventListener("hashchange", function () {
  takeAction()
})
