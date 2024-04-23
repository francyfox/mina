export const olMapData = {
  center: [4440510, 2441195],
  zoom: 18,
  rotation: 0,
  projection: 'EPSG:3857'
  //
  // OSM EPSG:4326
}

export const arcgisUrl =
  "https://services.wvgis.wvu.edu/arcgis/rest/services/Imagery_BaseMaps_EarthCover/wv_basemap_WVGISTC_3D_elevation_contours/MapServer";
export const arcgisRequestParams = {
  layers: "show:0",
  format: "PNG32",
  f: "image",
  dpi: 96,
  transparent: true,
  bboxSR: 102100,
  imageSR: 102100,
  size: "1024,1024",
  _ts: false,
};

export const contextMenu = (view) => [
  {
    text: "Center map here",
    classname: "some-style-class", // add some CSS rules
    callback: (val) => {
      view.value.setCenter(val.coordinate);
    },
  },
  '-'
]