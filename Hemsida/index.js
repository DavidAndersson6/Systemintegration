 const Visitoruri = 'https://5ea6a04884f6290016ba6f0e.mockapi.io/api/v1/visitors'

     loadData();

   function loadData(){

    const datadiv = document.getElementById('datadiv');
    datadiv.innerHTML = '';
    fetch(Visitoruri)
        .then((resp) => resp.json())
        .then(function (data) {
            return data.map(function (data){
            let divtag = document.createElement('div');
                
              divtag.innerHTML = `${data.name} <a href ="#" onclick="deleteVisitor(${data.id})" > Checka Ut</a>`;
              datadiv.appendChild(divtag);
        })
        });
   }

   function createVisitor() {

       
    const textInput = document.getElementById('name').value;
    var data = {name: textInput}

    fetch(Visitoruri, 
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

    setTimeout(() =>{
    loadData();
    },500);

    sendMail();
   }

  function deleteVisitor(id) {
      
    fetch(Visitoruri + "/" + id, 
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

    setTimeout(() =>{
    loadData();
    },500);
   }
function trainTimes(){


   const departurediv = document.getElementById('departures');
  
      const Trainuri = 'https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=3027dcd2014b4a0d9e63e612f082d7e5&siteid=9297&timewindow=10';
      fetch(Trainuri)
        .then((resp) => resp.json())
        .then(function (data) 
        {
            console.log(data)
          let departures = data.ResponseData.Metros;
          return departures.map(function (departure) {
              let divtag = document.createElement('div');
  
              divtag.innerHTML = `${departure.LineNumber + " " + departure.Destination + " " + departure.DisplayTime}`;
              departurediv.appendChild(divtag);
          })
        })
        .catch(function (error) 
        {
          console.log(error);
        });

    }