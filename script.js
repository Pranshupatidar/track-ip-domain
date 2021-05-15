const keyword = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const ipArea = document.getElementById("ip");
const locArea = document.getElementById("loc");
const timezoneArea = document.getElementById("timezone");
const ispArea = document.getElementById("isp");

var domain;
var ipAddress;
let latitude;
let longitude;

window.addEventListener("load",showLocation);
searchBtn.addEventListener("click", showLocation);

async function showLocation(){
    const searchValue = keyword.value;
    domain = '';
    ipAddress = '';
    if (searchValue.slice(0,3) === 'www'){
        domain = searchValue;
    }else{
        ipAddress = searchValue; 
    }
    const url = `https://geo.ipify.org/api/v1?apiKey=at_0GJOYbmAlkDjcbunA6XKJNbpiutH2&ipAddress=${ipAddress}&domain=${domain}`;

    const response = await fetch(url);
    const data = await response.json();
        ipArea.innerHTML = data.ip;
        locArea.innerHTML = data.location.city +`, `+ data.location.region +`, `+ data.location.country;
        timezoneArea.innerHTML = `UTC : ` + data.location.timezone;
        ispArea.innerHTML = data.isp;
        latitude = await data.location.lat;
        longitude = await data.location.lng;
        showMap(latitude,longitude);
}

var mymap = L.map('mapid',{ zoomControl: false , dragging : true , gestureHandling: true});

function showMap(ltt,lnt){

mymap.setView([ltt, lnt],13 );

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicHJhbnNodS1wYXRpZGFyIiwiYSI6ImNrb2p4N2Z5NjBhemgybmw4ajRyeWJxMWMifQ.eDCI0wALB8Xe33jL-qVJzQ'
}).addTo(mymap);

var marker = L.marker([ltt, lnt]).addTo(mymap);
}


