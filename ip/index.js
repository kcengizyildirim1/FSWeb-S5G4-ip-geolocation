//axios import buraya gelecek
import axios from "axios";
var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek
const staticIpLocationData = {
  sorgu: "78.190.140.114",
  durum: "OK",
  kıta: "Asia",
  ülke: "Turkey",
  ülkeKodu: "TR",
  ülkebayrağı: "https://apis.ergineer.com/ulkebayraklari/TR",
  bölge: "41",
  bölgeAdı: "Kocaeli",
  şehir: "Kosekoy",
  zip: "41100",
  enlem: 40.70400000000000062527760746888816356658935546875,
  boylam: 29.99569999999999936335370875895023345947265625,
  saatdilimi: "Europe/Istanbul",
  parabirimi: "TRY",
  isp: "TTNet A.S.",
  organizasyon: "Turk Telekomunikasyon A.S",
  as: "AS47331 TTNet A.S.",
};

const cardContainer = (data) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = `https://flagcdn.com/w320/${data.ülkeKodu.toLowerCase()}.png`;
  card.appendChild(image);

  const cardClass = document.createElement("div");
  cardClass.classList.add("card-info");
  card.appendChild(cardClass);

  const h3 = document.createElement("h3");
  h3.classList.add("ip");
  h3.textContent = data.sorgu;
  cardClass.appendChild(h3);

  const p = document.createElement("p");
  p.classList.add("ulke");
  p.textContent = data.ülkeKodu;
  cardClass.appendChild(p);

  const enlem = document.createElement("p");
  enlem.textContent = `Enlem: ${data.enlem} Boylam: ${data.boylam}`;
  cardClass.appendChild(enlem);

  const sehir = document.createElement("p");
  sehir.textContent = data.sehir;
  cardClass.appendChild(sehir);

  const saat = document.createElement("p");
  saat.textContent = `Saat dilimi: ${data.saatdilimi}`;
  cardClass.appendChild(saat);

  const paraBirimi = document.createElement("p");
  paraBirimi.textContent = `Para birimi: ${data.parabirimi}`;
  cardClass.appendChild(paraBirimi);

  const isp = document.createElement("p");
  isp.textContent = `ISP: ${data.isp}`;
  cardClass.appendChild(isp);

  return card;
};

const cards = document.querySelector(".cards");
// Static kod yazimi
// cards.appendChild(cardContainer(staticIpLocationData));

const createIP = async () => {
  await ipAdresimiAl();

  axios
    .get("https://apis.ergineer.com/ipgeoapi/" + benimIP)
    .then((res) => {
      console.log("axios", res.data);
      return res.data;
    })
    .then((ip) => {
      cards.appendChild(cardContainer(ip));
    });
};
createIP();
