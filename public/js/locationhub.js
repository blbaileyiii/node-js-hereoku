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
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    let h4 = document.createElement("h4");
    let ul = document.createElement("ul");

    ul.classList.add("hub");

    //console.log(hubObj);

    hubObj = hubObj.results;

    h3.textContent = "Current Location: " + hubObj[0].pname;
    p.textContent = hubObj[0].pdesc;
    h4.textContent = "Connecting Routes:";
    for(i=0; i < hubObj.length; i++) {
        //console.log(hubObj[i]);
        let li = document.createElement("li");
        if (hubObj[i].status){
            li.innerHTML = "<div class='name'>" + hubObj[i].cname + "</div><button class='hub-button open' value='" + hubObj[i].cid + "' onclick='setLocation(this.value)'><span>Travel</span><span class='glyphicon glyphicon-random'></span></button>";
        } else {
            li.innerHTML = "<div class='name'>" + hubObj[i].cname + "</div><div class='hub-button locked'><span class='glyphicon glyphicon-lock'></span><span>Locked</span></div>";    
            
        }
        //console.log(li);
        ul.appendChild(li);
    };

    locHub.innerHTML = "";

    locHub.appendChild(h3);
    locHub.appendChild(p);
    locHub.appendChild(h4);
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