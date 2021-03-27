let charid = document.querySelector('.charid').value;

function setLocation(locid) {
    urlGet = "/eowHub/?locid=" + locid;

    getLocHub(urlGet);
    postCharacterLocation(locid);
}


function getLocHub(url) {
    //let url = '/eowHub?locid=' + value;
    //console.log(url);
    const http = new XMLHttpRequest();
    let hubObj;
    http.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            hubObj = JSON.parse(this.responseText); 
            //console.log(hubObj);           
            buildLocHubHTML(hubObj);
        }
     };
     http.open("GET", url, true);
     http.send();
}

function buildLocHubHTML(hubObj) {
    let locHub = document.getElementById('locHub');
    let h2 = document.createElement("h2");
    let ul = document.createElement("ul");

    //console.log(hubObj);

    hubObj = hubObj.results;

    h2.textContent = hubObj[0].pname;
    for(i=0; i < hubObj.length; i++) {
        //console.log(hubObj[i]);
        let li = document.createElement("li");
        if (hubObj[i].status){
            li.innerHTML = hubObj[i].cname + " - <button value='" + hubObj[i].cid + "' onclick='setLocation(this.value)'>Explore</button>";
        } else {
            li.innerHTML = hubObj[i].cname + " - Locked";    
        }
        //console.log(li);
        ul.appendChild(li);
    };

    locHub.innerHTML = "";

    locHub.appendChild(h2);
    locHub.appendChild(ul);
}

function postCharacterLocation(locid) {
    //let url = '/eowHub?locid=' + value;

    url = "/eowTravel/";

    let data = {'charid': charid, 'locid': locid};

    console.log(JSON.stringify(data));
    
    console.log(url);
    const http = new XMLHttpRequest();
    let hubObj;
    http.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            response = JSON.parse(this.responseText); 
            console.log(response); 
        }
     };     
     http.open("POST", url, true);
     http.setRequestHeader('Content-Type', 'application/json');
     http.send(JSON.stringify(data));
}