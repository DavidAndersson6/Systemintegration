const uriVisitors = 'https://5ea6a04884f6290016ba6f0e.mockapi.io/api/v1/visitors'
const uriEmployees = 'https://5ea6a04884f6290016ba6f0e.mockapi.io/api/v1/employees'



function loadDataVisitors() {

    var visitorCounter = 0;
    const datadiv = document.getElementById('divVisitors');
    datadiv.innerHTML = '';
    fetch(uriVisitors)
        .then((resp) => resp.json())
        .then(function(data) {
            data.map(function(data) {
                let divtag = document.createElement('div');
                 visitorCounter++;

                 console.log(visitorCounter);

                  
               
                    
        

                divtag.innerHTML = `${data.name} <a href ="#" onclick="deleteVisitor(${data.id})" > Checka Ut</a>`;
            
                document.getElementById("divVisitorCounter").innerHTML = "Visitors in the building right now: " + visitorCounter;

            //divtag.innerHTML = `${data.name} - Status: ${data.status} - <a href ="#" onclick="changeStatus('På lunch', ${data.id})" >På lunch</a> - <a href ="#" onclick="changeStatus('I möte', ${data.id})" >I möte</a> - <a href ="#" onclick="changeStatus('Tillgänglig', ${data.id})" >Tillgänglig</a> - <a href ="#" onclick="deleteEmployee(${data.id})" >Checka ut</a>`;

                datadiv.appendChild(divtag);
          })

        });
}

function loadDataEmployees() {

    var employeeCounter = 0;
    const datadiv = document.getElementById('divEmployees');
    datadiv.innerHTML = '';
    fetch(uriEmployees)
        .then((resp) => resp.json())
        .then(function(data) {
            return data.map(function(data) {
                let divtag = document.createElement('div');
                employeeCounter++;

                

                divtag.innerHTML = `${data.name} <a href ="#" onclick="deleteEmployee(${data.id})" > Checka Ut</a>`;

                document.getElementById("divEmployeeCounter").innerHTML = "Employees in the building right now: " + employeeCounter;
           

                datadiv.appendChild(divtag);
            })
        });

        
}

function createVisitor() {


    const textInput = document.getElementById('nameVisitor').value;
    var data = { name: textInput }

    fetch(uriVisitors, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => console.log(res))

    setTimeout(() => {
        loadDataVisitors();
    }, 500);

   
}

function deleteVisitor(id) {


    
    fetch(uriVisitors + "/" + id, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => console.log(res))

    setTimeout(() => {
        loadDataVisitors();
    }, 500);
}

function createEmployee() {


    const textInput = document.getElementById('nameEmployee').value;
    var data = { name: textInput }

    fetch(uriEmployees, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => console.log(res))

    setTimeout(() => {
        loadDataEmployees();
    }, 500);

}

function deleteEmployee(id) {

    fetch(uriEmployees + "/" + id, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => console.log(res))

    setTimeout(() => {
        loadDataEmployees();
    }, 500);
}

function metroTimes() {


    const divMetroDepartures = document.getElementById('divMetroDepartures');

    const uriDepartures = 'https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=26e72a20505e43508d8833d3c8ff0b49&siteid=9297&timewindow=10';
    fetch(uriDepartures)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)
            
            let departures = data.ResponseData.Metros;
            divMetroDepartures.innerHTML= "";
            return departures.map(function(departure) {
                let divtag = document.createElement('div');

                divtag.innerHTML = `${departure.LineNumber + " " + departure.Destination + " " + departure.DisplayTime}`;
                divMetroDepartures.appendChild(divtag);

            })
        })

        
        .catch(function(error) {
            console.log(error);
        });

}

function busTimes() {


    const divBusDepartures = document.getElementById('divBusDepartures');

    const uriDepartures = 'https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=26e72a20505e43508d8833d3c8ff0b49&siteid=9297&timewindow=10';
    fetch(uriDepartures)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)
            let departures = data.ResponseData.Buses;
            divBusDepartures.innerHTML= "";
            return departures.map(function(departure) {
                let divtag = document.createElement('div');

           divtag.innerHTML = `${departure.LineNumber + " " + departure.Destination + " " + departure.DisplayTime}`;
                
         
            divBusDepartures.appendChild(divtag);
               

            })
            
        })

        
        .catch(function(error) {
            console.log(error);
        });

}

function getForecast() {

    const divForecast = document.getElementById('divForecast');
    const uriForecast = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/17.991/lat/59.2921/data.json';
var i;

    fetch(uriForecast)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)
            let forecasts = data.timeSeries[2].parameters;

            let divtag = document.createElement('div');
            forecasts.forEach(element => {
                if(element.name == "t")
                divtag.innerHTML = `${'Temperature: ' + element.values[0] + '°C'}`;
                divForecast.appendChild(divtag);
    
            });


          

        })
        .catch(function(error) {
            console.log(error);
        });

}

function getTime() {
    const divTime = document.getElementById('divTime');
    const uriTime = 'http://worldtimeapi.org/api/ip';

    fetch(uriTime)

    .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)
            let times = data.datetime;


            times = new Date();
            var currentTime = times.toLocaleTimeString();
           var hours = times.getHours();
            var minutes = times.getMinutes();
           var seconds = times.getSeconds();
        let divtag = document.createElement('div');


           //divtag.innerHTML = `${'Time: ' + times.toLocaleTimeString()}`;
          
           document.getElementById("time").innerHTML = currentTime;
          // document.getElementById("time").divtag.innerHTML = times.toLocaleTimeString();
           divTime.appendChild(divtag);
        })
        .catch(function(error) {
            console.log(error);
        });


}


function getJoke() {

    const divJoke = document.getElementById('divJokes');
    const uriJoke = 'https://api.chucknorris.io/jokes/random';

    fetch(uriJoke)

    .then((resp) => resp.json())
        .then(function(data) {
            console.log(data)
            let jokes = data.value;

            let divtag = document.createElement('div');

            divJoke.innerHTML = `${jokes}`;
            divJoke.appendChild(divtag);

        })
        .catch(function(error) {
            console.log(error);
        });
}


