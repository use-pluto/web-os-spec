(function () {
  let item = new URLSearchParams(location.search).get("protocol");
  //if the user didn't come from web+os
  if (item === null) {
    return;
  }
  //regexes for understanding approaches
  if (/^\/$/.test(item) === false) { //APP APPROACH

  } else { //FILE APPROACH

  }
})();
