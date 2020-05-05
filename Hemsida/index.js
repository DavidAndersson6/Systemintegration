const uriVisitors = 'https://5ea6a04884f6290016ba6f0e.mockapi.io/api/v1/visitors'


function loadData() {

  const datadiv = document.getElementById('datadiv');
  datadiv.innerHTML = '';
  fetch(uriVisitors)
    .then((resp) => resp.json())
    .then(function (data) {
      return data.map(function (data) {
        let divtag = document.createElement('div');

        divtag.innerHTML = `${data.name} <a href ="#" onclick="deleteVisitor(${data.id})" > Checka Ut</a>`;
        datadiv.appendChild(divtag);
      })
    });
}

function createVisitor() {


  const textInput = document.getElementById('name').value;
  var data = { name: textInput }

  fetch(uriVisitors,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",

      headers:
      {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => console.log(res))

  setTimeout(() => {
    loadData();
  }, 500);

  sendMail();
}

function deleteVisitor(id) {

  fetch(uriVisitors + "/" + id,
    {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",

      headers:
      {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => console.log(res))

  setTimeout(() => {
    loadData();
  }, 500);
}
function trainTimes() {


  const departurediv = document.getElementById('departures');

  const uriDepartures = 'https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=3027dcd2014b4a0d9e63e612f082d7e5&siteid=9297&timewindow=10';
  fetch(uriDepartures)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data)
      let departures = data.ResponseData.Metros;
      return departures.map(function (departure) {
        let divtag = document.createElement('div');

        divtag.innerHTML = `${departure.LineNumber + " " + departure.Destination + " " + departure.DisplayTime}`;
        departurediv.appendChild(divtag);
      })
    })
    .catch(function (error) {
      console.log(error);
    });

}

function getForecast() {

  const divForecast = document.getElementById('divForecast');
  const uriForecast = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/17.991/lat/59.2921/data.json';

  fetch(uriForecast)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(data)
      let forecasts = data.timeSeries[2].parameters;

      let divtag = document.createElement('div');

      divtag.innerHTML = `${'Temperature: ' + forecasts[1].values[0]}`;
      divForecast.appendChild(divtag);


    })
    .catch(function (error) {
      console.log(error);
    });

}

