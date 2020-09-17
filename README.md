# RightCapital Snippets

## Create Bookmarklet

1. Copy code from rightCapitalBookmarklet.js
2. Go to https://bookmarklets.org/maker/ to make the bookmarklet
3. Within RightCapital, click the bookmarklet to activate code

## Features

### Enables Target allocation

1. Go to Investment > Asset Allocation
2. Click the bookmarklet
3. The dropdown for Target allocation is enabled

### Enable selection of table values

1. Go to a table that isn't selectable
2. Click the bookmarklet to enable the text
3. You can copy text now, but if you select a rows or columns of values, they will be clumped together without any spaces :(

### Add totals to Retirement > Cash Flows tables

1. Go to the tables in Retirement > Cash Flows tables
2. Click the bookmarklet
3. Notice the totals are in the headers.

### Encoded bookmarklet if you don't want to create a new one from https://bookmarklets.org/maker/

```
javascript:void%20function(){function%20e(){var%20e=window.location.href,t=e.lastIndexOf(%22/%22),r=e.substring(t+1).split(%22%23%22);o(),%22asset-allocation%22===r[0]%3Fa():%22cash-flows%22===r[0]%26%26n(r[1])}function%20n(e){var%20n=angular.element(%22button%22).scope().cashFlow.data;Object.values(n).forEach(function(n){r(n,e)})}function%20t(e){var%20n=new%20Array(e[0].length).fill(0);n[0]=e[e.length-1][0],n[1]=e[e.length-1][1],e.forEach(function(t){for(var%20r=2;r%3Ce[0].length;r++)n[r]=n[r]+t[r]});var%20t=document.querySelectorAll(%22.custom-header-cell%22);n.forEach(function(e,n){var%20r=document.createElement(%22div%22);r.style.fontSize=%2212px%22,0===n%26%26(r.innerText=e),r.innerText=e.toLocaleString(%22en-US%22,{style:%22currency%22,currency:%22USD%22,minimumFractionDigits:0,maximumFractionDigits:0});var%20a=document.createElement(%22div%22);a.style.fontSize=%2212px%22,t[n]%26%26(a.innerText=t[n].innerText,t[n].style.flexFlow=%22column%22,t[n].innerText=%22%22,t[n].append(a),t[n].append(r))})}function%20r(e,n){e.id===n%3Ft(e.table.data):e.hasOwnProperty(%22children%22)%26%26e.children.forEach(function(e){return%20r(e,n)})}function%20a(){document.getElementsByName(%22investment_target_category_mix_id%22)[0].disabled=!1}function%20o(){var%20e=document.querySelectorAll('[unselectable=%22on%22]');Array.from(e).forEach(function(e){e.removeAttribute(%22unselectable%22)});var%20n=document.querySelectorAll(%22.ag-unselectable%22);Array.from(n).forEach(function(e){e.classList.remove(%22ag-unselectable%22)})}e(),window.addEventListener(%22hashchange%22,function(){e()})}();
```
