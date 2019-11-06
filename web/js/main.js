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

const CAT = ['https://www.jumia.cm/electronique/',
                'https://www.jumia.cm/tvs/',
                'https://www.jumia.cm/smart-tv/',
                'https://www.jumia.cm/tvs-led/',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/?q=Mini+TV',
                'https://www.jumia.cm/tv-32/',
                'https://www.jumia.cm/son-image-gps/?display_size=40.0--55.0',
                'https://www.jumia.cm/son-image-gps/?display_size=50.0--65.0',
                'https://www.jumia.cm/home-cinema-pour-tv/',
                'https://www.jumia.cm/eclairages-stabilisateurs/',
                'https://www.jumia.cm/electronique-recepteurs-amplificateurs-av/',
                'https://www.jumia.cm/systeme-home-cinema/',
                'https://www.jumia.cm/home-cinema-pour-tv/',
                'https://www.jumia.cm/electronique-haut-parleurs/',
                'https://www.jumia.cm/accessoires-tablette-ecouteurs-casques/',
                'https://www.jumia.cm/lecteur-musique-portable/',
                'https://www.jumia.cm/camera-video/',
                'https://www.jumia.cm/videos/',
                'https://www.jumia.cm/electronique-videosurveillance/',
                'https://www.jumia.cm/photo-accessoires-divers/',
                'https://www.jumia.cm/son-image-gps/',
                'https://www.jumia.cm/tvs/samsung/',
                'https://www.jumia.cm/tvs/lg/',
                'https://www.jumia.cm/tvs/hisense/',
                'https://www.jumia.cm/tvs/star-sat/',
                'https://www.jumia.cm/tvs/kal/',
                'https://www.jumia.cm/tvs/innova/',
                'https://www.jumia.cm/tvs/nasco/',
                'https://www.jumia.cm/frigo-refrigerateurs/fiabtec/',
                'https://www.jumia.cm/telephone-tablette/',
                'https://www.jumia.cm/telephones-smartphones/',
                'https://www.jumia.cm/smartphones/',
                'https://www.jumia.cm/smartphones-android/',
                'https://www.jumia.cm/iphone/',
                'https://www.jumia.cm/telephones-portables/',
                'https://www.jumia.cm/accessoires-telephone/',
                'https://www.jumia.cm/montres-connectees/',
                'https://www.jumia.cm/telephones-tablettes-etuis/',
                'https://www.jumia.cm/telephonie-protecteurs-ecrans/',
                'https://www.jumia.cm/son-image-gps/?q=casque+et+ecouteur&sort=Price%3A+Low+to+High&dir=asc',
                'https://www.jumia.cm/telephones-tablettes-casques-bluetooth/',
                'https://www.jumia.cm/power-banks/',
                'https://www.jumia.cm/catalog/?q=bluetooth',
                'https://www.jumia.cm/telephone-chargeur/',
                'https://www.jumia.cm/samsung-galaxy-s10/',
                'https://www.jumia.cm/huawei-p30/',
                'https://www.jumia.cm/iphone-x/',
                'https://www.jumia.cm/huawei-p20-pro/',
                'https://www.jumia.cm/samsung-a30/',
                'https://www.jumia.cm/tecno-camon-11/',
                'https://www.jumia.cm/samsung-a50/',
                'https://www.jumia.cm/samsung-a70/',
                'https://www.jumia.cm/xiaomi-redmi-6a/',
                'https://www.jumia.cm/tecno-spark-3/',
                'https://www.jumia.cm/xiaomi-redmi-6-pro/',
                'https://www.jumia.cm/samsung-j4-plus/',
                'https://www.jumia.cm/samsung-galaxy-s8/',
                'https://www.jumia.cm/tablettes-tactiles/',
                'https://www.jumia.cm/tablettes-tactiles/huawei/',
                'https://www.jumia.cm/telephones-tablettes-accessoires-tablette/',
                'https://www.jumia.cm/telephone-tablette/',
                'https://www.jumia.cm/telephone-tablette/apple/',
                'https://www.jumia.cm/telephone-tablette/samsung/',
                'https://www.jumia.cm/telephone-tablette/huawei/',
                'https://www.jumia.cm/xiaomi/',
                'https://www.jumia.cm/telephone-tablette/umidigi/',
                'https://www.jumia.cm/telephone-tablette/itel/',
                'https://www.jumia.cm/telephone-tablette/tecno/',
                'https://www.jumia.cm/telephone-tablette/lenovo/',
                'https://www.jumia.cm/maison-cuisine-jardin/',
                'https://www.jumia.cm/maison-bureau-petits-electromenager/',
                'https://www.jumia.cm/maison-cuisine-jardin/?q=micro-onde',
                'https://www.jumia.cm/blenders-chauffants/',
                'https://www.jumia.cm/cuiseurs-a-riz/',
                'https://www.jumia.cm/fers-vapeur/',
                'https://www.jumia.cm/maison-bureau-electromenager/',
                'https://www.jumia.cm/maison-bureau-appareils-cuisson/',
                'https://www.jumia.cm/refrigerateurs-frigo/',
                'https://www.jumia.cm/congelateurs/',
                'https://www.jumia.cm/climatiseur-chauffe-eau/',
                'https://www.jumia.cm/chauffage-refroidissement-qualite-air-climatiseurs-accessoires/',
                'https://www.jumia.cm/outils-de-bricolage/',
                'https://www.jumia.cm/cuisine-cuisson/',
                'https://www.jumia.cm/casseroles-marmites/',
                'https://www.jumia.cm/meubles-a-tiroirs/',
                'https://www.jumia.cm/couteaux-hachoirs/',
                'https://www.jumia.cm/epicerie-nettoyage-domestique/',
                'https://www.jumia.cm/grandes-tailles-bas/',
                'https://www.jumia.cm/cuisine-cuisson/',
                'https://www.jumia.cm/maison-bureau-meubles/',
                'https://www.jumia.cm/linge-de-maison/',
                'https://www.jumia.cm/maison-decoration/',
                'https://www.jumia.cm/maison-bureau-art-mural/',
                'https://www.jumia.cm/maison-bureau-eclairage-ventilateur-plafond/',
                'https://www.jumia.cm/maison-cuisine-jardin/',
                'https://www.jumia.cm/maison-cuisine-jardin/nasco/',
                'https://www.jumia.cm/maison-cuisine-jardin/binatone/',
                'https://www.jumia.cm/maison-cuisine-jardin/a-general/',
                'https://www.jumia.cm/maison-cuisine-jardin/royalty-line/',
                'https://www.jumia.cm/maison-cuisine-jardin/kenwood/',
                'https://www.jumia.cm/maison-cuisine-jardin/scarlett/',
                'https://www.jumia.cm/maison-cuisine-jardin/midea/',
                'https://www.jumia.cm/maison-cuisine-jardin/nova/',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/',
                'https://www.jumia.cm/ordinateurs-pc/',
                'https://www.jumia.cm/tous-les-ordinateurs-portables/',
                'https://www.jumia.cm/informatique-ordinateurs-fixes/',
                'https://www.jumia.cm/informatique-ordinateurs-fixes/',
                'https://www.jumia.cm/pc-portables/hp/',
                'https://www.jumia.cm/pc-portables/dell/',
                'https://www.jumia.cm/pc-portables/lenovo/',
                'https://www.jumia.cm/pc-portables/asus/',
                'https://www.jumia.cm/imprimantes-pc/',
                'https://www.jumia.cm/imprimantes-pc/',
                'https://www.jumia.cm/scanner/',
                'https://www.jumia.cm/informatique-encre-imprimante-toner/',
                'https://www.jumia.cm/peripheriques-logiciels-accessoires/',
                'https://www.jumia.cm/claviers-et-souris/',
                'https://www.jumia.cm/gaming-graphisme/',
                'https://www.jumia.cm/reseaux-wifi/',
                'https://www.jumia.cm/son-informatique/',
                'https://www.jumia.cm/catalog/?q=sac+ordinateur',
                'https://www.jumia.cm/son-informatique/',
                'https://www.jumia.cm/stockage/',
                'https://www.jumia.cm/cles-usb/',
                'https://www.jumia.cm/cartes-memoires/',
                'https://www.jumia.cm/disques-durs-externes/',
                'https://www.jumia.cm/ordinateurs-accessoires-composants-logiciels/',
                'https://www.jumia.cm/informatique-antivirus-securite/',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/?q=server',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/hp/',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/lenovo/',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/asus/',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/dell/',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/apple/',
                'https://www.jumia.cm/imprimantes-pc/hp/',
                'https://www.jumia.cm/imprimantes-pc/canon/',
                'https://www.jumia.cm/stockage/seagate/',
                'https://www.jumia.cm/cartes-memoires/sandisk/',
                'https://www.jumia.cm/ordinateurs-accessoires-informatique/tp-link/',
                'https://www.jumia.cm/fashion-mode/',
                'https://www.jumia.cm/fashion-mode-homme/',
                'https://www.jumia.cm/vetements-hommes/',
                'https://www.jumia.cm/chaussures-hommes/',
                'https://www.jumia.cm/accessoires-hommes-mode/',
                'https://www.jumia.cm/vetements-hommes-pantalons/',
                'https://www.jumia.cm/mode-vetements-homme-traditionnels-culturels/',
                'https://www.jumia.cm/bijoux-homme/',
                'https://www.jumia.cm/mode-montres-homme/',
                'https://www.jumia.cm/polos/',
                'https://www.jumia.cm/sous-vetements/',
                'https://www.jumia.cm/mode-mode-enfant/',
                'https://www.jumia.cm/mode-garcons/',
                'https://www.jumia.cm/mode-filles/',
                'https://www.jumia.cm/fashion-mode-femme/',
                'https://www.jumia.cm/robes-femmes-voilees/',
                'https://www.jumia.cm/au-bureau/',
                'https://www.jumia.cm/chaussures-femmes/',
                'https://www.jumia.cm/pantacourts/',
                'https://www.jumia.cm/mode-vetements-traditionnels-culturels/',
                'https://www.jumia.cm/womens-fashion-accessories/',
                'https://www.jumia.cm/mode-montres-femme/',
                'https://www.jumia.cm/lingerie-femme/',
                'https://www.jumia.cm/mode-magasin-sport/',
                'https://www.jumia.cm/mode-magasin-sport/',
                'https://www.jumia.cm/maison-cuisine-jardin/?q=%C3%A0+dos+sac+a',
                'https://www.jumia.cm/mode-accessoires-sport/',
                'https://www.jumia.cm/mode-chaussures-sport/',
                'https://www.jumia.cm/epicerie/',
                'https://www.jumia.cm/epicerie/',
                'https://www.jumia.cm/catalog/?q=riz+parfum%C3%A9',
                'https://www.jumia.cm/catalog/?q=miel',
                'https://www.jumia.cm/epicerie-non-alcoolique/',
                'https://www.jumia.cm/epicerie/?q=jus',
                'https://www.jumia.cm/catalog/?q=caf%C3%A9+th%C3%A9',
                'https://www.jumia.cm/divers/?q=lait',
                'https://www.jumia.cm/epicerie-biere-vin-spiritueux/',
                'https://www.jumia.cm/epicerie-du-vin/',
                'https://www.jumia.cm/epicerie-champagne-vin-mousseux/',
                'https://www.jumia.cm/epicerie-spiritueux-liqueurs/',
                'https://www.jumia.cm/soin-cheveux/',
                'https://www.jumia.cm/anti-age/',
                'https://www.jumia.cm/beaute-hygiene-sante/?q=savon',
                'https://www.jumia.cm/catalog/?q=deodorant',
                'https://www.jumia.cm/epicerie-nettoyage-domestique/',
                'https://www.jumia.cm/accessoires-de-nettoyage/',
                'https://www.jumia.cm/desodorisants-parfums-d-ambiance/',
                'https://www.jumia.cm/beaute-hygiene-sante/',
                'https://www.jumia.cm/parfums/',
                'https://www.jumia.cm/parfums-homme/',
                'https://www.jumia.cm/parfums-femme/',
                'https://www.jumia.cm/maquillage/',
                'https://www.jumia.cm/produits-maquillage-visage/',
                'https://www.jumia.cm/produits-maquillage-yeux/',
                'https://www.jumia.cm/maquillage-levres/',
                'https://www.jumia.cm/maquillage-ongles/',
                'https://www.jumia.cm/ensembles-rasage-toilettage/',
                'https://www.jumia.cm/sante-beaute-beaute-soins-personnels/',
                'https://www.jumia.cm/soin-hydratant-reparateur/',
                'https://www.jumia.cm/rasage-epilation/',
                'https://www.jumia.cm/soin-et-beaute/?q=foot+care',
                'https://www.jumia.cm/hygiene-feminine/',
                'https://www.jumia.cm/sante-beaute-soins-bucco-dentaires/',
                'https://www.jumia.cm/sante-beaute-beaute-soins-personnels/?q=men+beauty',
                'https://www.jumia.cm/razors-blades/',
                'https://www.jumia.cm/sante-beaute-bien-etre-relaxation/',
                'https://www.jumia.cm/beaute-hygiene-sante/nivea/',
                'https://www.jumia.cm/beaute-hygiene-sante/yves-rocher/',
                'https://www.jumia.cm/beaute-hygiene-sante/longrich/',
                'https://www.jumia.cm/beaute-hygiene-sante/neutrogena/',
                'https://www.jumia.cm/beaute-hygiene-sante/kylie/',
                'https://www.jumia.cm/beaute-hygiene-sante/f-fashion/',
                'https://www.jumia.cm/beaute-hygiene-sante/bio-oil/',
                'https://www.jumia.cm/beaute-hygiene-sante/smart-collection/',
                'https://www.jumia.cm/beaute-hygiene-sante/balea/',
                'https://www.jumia.cm/beaute-hygiene-sante/maybelline/',
                'https://www.jumia.cm/bebe-puericulture/',
                'https://www.jumia.cm/produits-bebes-soin-peau/',
                'https://www.jumia.cm/produits-bebes-savons-nettoyants/',
                'https://www.jumia.cm/produits-bebes-vetements-accessoires/',
                'https://www.jumia.cm/mode-bebe-garcon/',
                'https://www.jumia.cm/mode-filles-chaussures-bebes/',
                'https://www.jumia.cm/couches-toilettes-bebe/',
                'https://www.jumia.cm/lingettes-bebe/',
                'https://www.jumia.cm/repas-de-bebe/',
                'https://www.jumia.cm/produits-bebes-nourriture-bebes/',
                'https://www.jumia.cm/produits-bebes-biberon/',
                'https://www.jumia.cm/produits-bebes-bain-soin-peau/',
                'https://www.jumia.cm/chicco/',
                'https://www.jumia.cm/matelas-de-jeux-pour-bebe/legrand/',
                'https://www.jumia.cm/jeux-videos-consoles/',
                'https://www.jumia.cm/jeux-videos-consoles/playstation/',
                'https://www.jumia.cm/sports-loisirs/',
                'https://www.jumia.cm/sport-fitness-musculation/',
                'https://www.jumia.cm/automobile-outils/',
                'https://www.jumia.cm/livres-papeterie/',
                'https://www.jumia.cm/terrasse-jardin-exterieur/',
                'https://www.jumia.cm/industriel-scientifique/',
                'https://www.jumia.cm/instruments-musique/',
                'https://www.jumia.cm/animalerie/',
                'https://www.jumia.cm/deals-billetterie/',
                'https://www.jumia.cm/jeux-et-jouets/'
]

// Host box
var hostBox = document.getElementById('host');
for(var i = 0, l = HOST.length; i < l; i++){
    var option = document.createElement("option");
    option.text = HOST[i];
    hostBox.options.add( option );
}

// Categorie box
var catBox = document.getElementById('category');
var option = document.createElement("option");
option.text = "Any";
option.value = 0;
catBox.options.add( option );
for(var i = 0, l = CAT.length; i < l; i++){
    var option = document.createElement("option");
    option.value = CAT[i];
    option.text = CAT[i].replace("https://www.jumia.cm/", "").replace("/", "");
    catBox.options.add( option );
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

    // if(document.getElementById("search").value.length <= 1){
    //     alert("Provide something to search!")
    //     return false;
    // }
    document.getElementsByTagName("html")[0].style.overflow = "auto"
    document.getElementById("estimated").innerHTML = "Loading, please wait few seconds...";
    document.getElementById('results').innerHTML = "<center><img src='images/load.gif'></center>";
    document.getElementById('code').innerHTML = "";
    // 2. Configure it: GET-request for the URL /article/.../load
    xhr.open('GET', apiLink+'/flash?host='+document.getElementById("host").value+
                    "&percent="+document.getElementById("percent").value+
                    "&find="+document.getElementById("search").value+
                    "&level="+document.getElementById("level").value+
                    "&price="+document.getElementById("price").value+
                    "&category="+document.getElementById("category").value+
                    "&not_contain="+(document.getElementById("not_contain").value.length === 0 ? "qscred243":document.getElementById("not_contain").value)+
                    "&must_contain="+document.getElementById("must_contain").value);

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
            document.getElementById("code").innerHTML = (xhr.response !== null ? xhr.response.code: "------");
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