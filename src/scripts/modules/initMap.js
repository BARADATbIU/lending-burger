function initMap() {
  const myMap = new google.maps.Map(document.getElementById("myMap"), {
    zoom: 10,
    center: { lat: 59.94, lng: 30.38 },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    }
  });

  setMarkers(myMap);
}

const markers = [
  {
    lat: 59.915038,
    lng: 30.486096,
    content: "Товарищеский проспект, 20/27"
  },
  {
    lat: 59.94708381,
    lng: 30.38481688,
    content: "Тверская улица, 16"
  },
  {
    lat: 59.891295,
    lng: 30.316907,
    content: "Московский проспект, 103к2"
  },
  {
    lat: 59.973999,
    lng: 30.311091,
    content: "улица Чапыгина, 13А"
  }
];

function setMarkers(myMap) {
  const image = {
    url: "images/svgicons/map-marker.svg",
    size: new google.maps.Size(46, 57)
  };

  markers.forEach(obj => {
    const marker = new google.maps.Marker({
      position: { lat: obj.lat, lng: obj.lng },
      title: "Нажми",
      icon: image,
      map: myMap
    });
    const infowindow = new google.maps.InfoWindow({
      content: obj.content
    });
    marker.addListener("click", () => {
      infowindow.open(marker.get("myMap"), marker);
    });
  });
}

export default initMap;
