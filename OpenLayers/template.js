function initCustomerMap(lat, lon) {
  _map = new ol.Map({
    target: 'map',
    loadTilesWhileInteracting: true,
    layers: [
      new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key: 'AshSadfkGhR4Zi9KyhD1eJKqsMZc2bBA9YGclP2VNgtpEl4x66Bp8I_IF2xHSaac',
          imagerySet: 'Road'
        })
      }),
      new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [
            new ol.Feature({
              geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326','EPSG:3857')),
              name: 'Customer Location'
            })
          ]
        }),
        style: new ol.style.Style({
          image: new ol.style.Icon(({
            src: 'marker.png'
          }))
        })
      })
    ],
    view: new ol.View({
      center: ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'),
      zoom: 4
    })
  })
};

initCustomerMap(20, 10);
