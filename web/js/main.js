const apiLink = "http://127.0.0.1:7777";
const HOST = [
        "https://jumia.cm",
        "https://jumia.sn",
        "https://www.jumia.com.ng",
        "https://www.jumia.com.eg",
        "https://www.jumia.ma",
        "https://www.jumia.co.ke",
        "https://www.jumia.ci",
        "https://www.jumia.com.tn",
        "https://www.jumia.dz",
        "https://www.jumia.com.gh",
        "https://www.jumia.sn",
        "https://www.jumia.co.tz",
        "https://www.jumia.ug",
        "https://www.jumia.rw",
        "https://www.jumia.com.ng"
]
// Host box
var hostBox = document.getElementById('host');
for(var i = 0, l = HOST.length; i < l; i++){
    var option = document.createElement("option");
    option.text = HOST[i];
    hostBox.options.add( option );
}

// Percent Host
var percentBox = document.getElementById('percent');
var option = document.createElement("option");
option.text = "Any";
option.value = 0;
percentBox.options.add( option );
for(var i = 5, l = 100; i < l; i++){
    var option = document.createElement("option");
    option.text = "-"+i+"%";
    option.value = i;
    percentBox.options.add( option );
}

var priceBox = document.getElementById('price');
var option = document.createElement("option");
option.text = "Any";
option.value = 0;
priceBox.options.add( option );
for(var i = 100, l = 999999; i < l; i+=100){
    var option = document.createElement("option");
    option.text = 0+" -> "+parseInt(i+100);
    option.value = (0+"-"+(i+100));
    priceBox.options.add( option );
}

// 1. Create a new XMLHttpRequest object
let xhr = new XMLHttpRequest();
var resultBox = document.getElementById('results');


document.getElementById("price").onchange = function(e){
    document.getElementById("percent").value = "0";

}
document.getElementById("percent").onchange = function(e){
    document.getElementById("price").value = "0";
}

document.getElementById("gogo").onclick = function(e){
    e.preventDefault();

    if(document.getElementById("search").value.length <= 1){
        alert("Provide something to search!")
        return false;
    }
    document.getElementsByTagName("html")[0].style.overflow = "auto"
    document.getElementById("estimated").innerHTML = "Loading, please wait few seconds...";
    document.getElementById('results').innerHTML = "<center><img src='images/load.gif'></center>";
    document.getElementById('code').innerHTML = "";
    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', apiLink+'/flash?host='+document.getElementById("host").value+
                    "&percent="+document.getElementById("percent").value+
                    "&find="+document.getElementById("search").value+
                    "&level="+document.getElementById("level").value+
                    "&price="+document.getElementById("price").value
                    );

    xhr.responseType = 'json';

    // 3. Send the request over the network
    xhr.send();

    // 4. This will be called after the response is received
    xhr.onload = function() {
        if (xhr.status != 200) { // analyze HTTP status of the response
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { 
            document.getElementById('results').innerHTML = "";  
            // show the result
            // alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
            //console.log(xhr.response);
            document.getElementById("code").innerHTML = xhr.response.code;
            document.getElementById("estimated").innerHTML = xhr.response.fetched + " and " + xhr.response.filtered;
            var valuee = ""
            for(var i = 0, l = xhr.response.results.length; i < l; i++){
                if(xhr.response.results[i]["percent"] == 0){
                    valuee = xhr.response.results[i]["price"];
                }else{
                    valuee = "-"+xhr.response.results[i]["percent"]+"%";
                }
                var format = "<div> > [ "+valuee+" ] <a class='result' href="+xhr.response.results[i]["href"]+" target='_blank'>"+xhr.response.results[i]["title"]+"</a></div><br>"
                resultBox.innerHTML += format;
            }

        }
    };

    xhr.onerror = function() {
        alert("Request failed");
        document.getElementById('results').innerHTML = "";
    };
};
/*
<script>

<input type="search" id="searchBox">
<select id="countries">
    <option value="arg">Argentina</option>
    <option value="usa">United States of America</option>
    <option value="som">Somalia</option>
</select>
var searchBox = document.querySelector("#searchBox");
var countries = document.querySelector("#countries");
var when = "keyup"; //You can change this to keydown, keypress or change

searchBox.addEventListener("keyup", function (e) {
    var text = e.target.value; 
    var options = countries.options; 
    for (var i = 0; i < options.length; i++) {
        var option = options[i]; 
        var optionText = option.text; 
        var lowerOptionText = optionText.toLowerCase();
        var lowerText = text.toLowerCase(); 
        var regex = new RegExp("^" + text, "i");
        var match = optionText.match(regex); 
        var contains = lowerOptionText.indexOf(lowerText) != -1;
        if (match || contains) {
            option.selected = true;
            return;
        }
        searchBox.selectedIndex = 0;
    }
});
</script>
*/