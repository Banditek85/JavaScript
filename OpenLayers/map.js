var attribution = new ol.control.Attribution({
  collapsible: false
});

var map = new ol.Map({
  controls: ol.control.defaults({attribution: false}).extend([attribution]),
  layers: [
      new ol.layer.Tile({
          source: new ol.source.OSM({
              url: 'https://tile.openstreetmap.be/osmbe/{z}/{x}/{y}.png',
              attributions: [ ol.source.OSM.ATTRIBUTION, 'Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>' ],
              maxZoom: 18
          })
      })
  ],
  target: 'map',
  view: new ol.View({
      center: ol.proj.fromLonLat([4.35247, 50.84673]),
      maxZoom: 18,
      zoom: 12
  })
});