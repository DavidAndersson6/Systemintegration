/* toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


var x = document.getElementById("countries");

fetch('https://5ea6a04c84f6290016ba6f29.mockapi.io/api/v1/countries')
    .then((resp) => resp.json())
    .then(function (data) {
        data.forEach(element => {

            var text = document.getElementById("myDropdown");
            var temp = document.createTextNode(element.country);
            text.innerHTML += '<a href="#" onclick="soap(' + "'" + element.ISO + "'" + ')">' + element.country + '</a>';


        });
    });


function soap(param) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso', true);

    // build SOAP request
    var sr =
        '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">' +
        '<soap:Header/>' +
        '<soap:Body>' +
        '<web:CountryFlag>' +
        '<web:sCountryISOCode>'+param+'</web:sCountryISOCode>' +
        '</web:CountryFlag>' +
        '</soap:Body>' +
        '</soap:Envelope>';


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                getInfo(xmlhttp);
              // alert(xmlhttp.DomNode.getNodeValue());
                // alert('done. use firebug/console to see network response');
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    // send request
    // ...
}


function getInfo(xml) {

    
        var xmlDoc = xml.responseXML;
        var x = xmlDoc.getElementsByTagName("m:CountryFlagResult")[0];
        var y = x.childNodes[0];
       // document.getElementById("flag").innerHTML = y.nodeValue;

            


    var img = new Image();
    var div = document.getElementById('flag');
    img.onload = function () {
        div.innerHTML += '<img src="' + img.src + '" />';
    };

    img.src = y.nodeValue;

    }
    
