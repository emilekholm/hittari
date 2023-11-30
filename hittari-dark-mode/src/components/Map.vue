<template>
    <div class="w-full h-full" :id="mapId"></div>
</template>

<script>

  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import "@tweenjs/tween.js"
  // import "leaflet-heatmap/leaflet-heatmap.js";
  import MapPopup from "./MapPopup.vue";
  import {createApp} from 'vue';

  import "leaflet.heat"

  export default {
    name: "Map",
    props: { 
      mapId: String,
      isLocationSelector: {
        type: Boolean,
        default: false,
      },
      selectMarkerColorClass: {
        type: String,
        default: 'bg-blue-400',
      },
      addToHeatmapOnClick: {
        type: Boolean,
        default: false,
      }
    },
    components: { MapPopup },
    data() {
      return {
        map: null,
        selectMarker: null,
        heatLayer: null,
        dataForEvents: [],
        currentEventCounter: 0,
      };
    },
    mounted() {
      // Config file for heatmap
      //var heatmapLayer = new HeatmapOverlay(cfg);
      //- End config file
      // Otnäs koordinater
      var otaniemix=60.1856
      var otaniemiy= 24.830032
      this.map = L.map(this.mapId, {zoomControl:false, doubleClickZoom:false}).setView([otaniemix, otaniemiy], 14);
      const lightLayer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", { // Added 'baselayer' in order to try to get heatmap to work
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      });
      const darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      });

      this.heatLayer = L.heatLayer([], {radius: 25})
      
      darkLayer.addTo(this.map);
      this.heatLayer.addTo(this.map);

      // This segment fixes a weird bug where pins created after opening a popup don't stick to their map location when zooming
      L.Popup.prototype._animateZoom = function (e) {
        if (!this._map) {
          return
        }
        var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
          anchor = this._getAnchor()
        L.DomUtil.setPosition(this._container, pos.add(anchor))
      }
      //use a mix of renderers
      var customPane = this.map.createPane("customPane");
      var canvasRenderer = L.canvas({ pane: "customPane" });
      customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400
     
      // Abloc marker
      //L.marker([60.184943, 24.823549], {icon: this.coloredMarker("bg-green-500", false)}).addTo(this.map);
      //

      if(this.isLocationSelector){
        const self = this;
        this.map.on('click', 
          function(e){
            var coord = e.latlng;
            var lat = coord.lat;
            var lng = coord.lng;
            
            const m = L.marker([lat, lng], {icon: self.coloredMarker(self.selectMarkerColorClass, true)}).addTo(self.map);

            if(self.selectMarker){
              self.map.removeLayer(self.selectMarker);
            }

            self.selectMarker = m;
          });
      }
      if(this.addToHeatmapOnClick){
        const self = this;
        this.map.on('dblclick', 
          function(e){
            var coord = e.latlng;
            self.addPointToHeatmap(coord);
          });
      }

      this.map.on('popupopen', (e) => {
        const button = e.popup._wrapper.querySelector('.btn-primary');
        if(button)
          button.addEventListener("click", this.eventButtonClicked);
      })
    },
    methods: {
      removeMarker(index) {
        this.markers.splice(index, 1);
      },
      addEventMarker(point, text, colorClass = "bg-blue-600", description, image, time, creator, visibilityFilter){
        const hasText = !(text == undefined || text == "" || text == null) // Checking if the given text is valid and not empty
        const hasDescription = !(description == undefined || description == "" || description == null)

        let hasCreator=true;
        if(!creator){
          hasCreator=false;
        }

        if(!hasText || !hasDescription)
          return;

        const hasTime = !(time == undefined || time == "" || time == null)
        const hasImage = !(image == undefined || image == null || image == ""); // Image is an image url
        const m = this.addMarker(point, colorClass, true);

        const popup = L.popup({
          content: `
            <p class="text-lg text-center">${text}<span class="text-gray-400 ml-2 p-0" ${hasTime ? '' : 'hidden'}>${time}</span></p>
            <div ${hasCreator ? '' : 'hidden'}>
              <p class="text-md p-0 m-0 text-gray-500"}>Created by:</p>
              <p class=text-md p-0 m-0 text-gray-500">${creator.name}</p>
            </div>
            <button class="btn-primary px-5 w-full" eventID="${this.currentEventCounter}">More info</button>
          `
        });

        for(let j=0; j<creator.heatScore/100; j++){
          const lat = point.lat + (Math.random() - 0.5) * 0.0003;
          const lng = point.lng + (Math.random() - 0.5) * 0.0006;
          this.addPointToHeatmap({lat: lat, lng: lng});
        }

        this.dataForEvents[this.currentEventCounter] = {
          text: text,
          description: description,
          image: image,
          time: time,
          creator: creator,
          visibilityFilter: visibilityFilter,
        }

        this.currentEventCounter++;

        m.bindPopup(popup);

        popup.toggle();
      },
      
      addRandomHeatmap(coord){
        this.addPointToHeatmap(coord)
      },
      addMarker(point, colorClass = "bg-blue-600", showDot) {
        const m = L.marker([point.lat, point.lng], {icon: this.coloredMarker(colorClass, showDot)}).addTo(this.map);
        return m;
      },
      addMarkerCenter(colorClass, showDot = false){
        this.addMarker(this.map.getCenter(), colorClass, showDot);
      },
      addPointToHeatmap(point){
        console.log(point);
        this.heatLayer.addLatLng([point.lat, point.lng]);
      },
      addCenterPointToHeatmap(){ // A helper function for addPointToHeatmap, gets called from App.vue, find a better way of doing this
        this.addPointToHeatmap(this.map.getCenter());
      },
      addTestMarkers(colorClass, Accounts){ // Just a quick test to display a couple of markers 
         // Generate x random markers in the area 
        for (let i=0; i<10;i++){
         const ranlong= Math.random();
         const ranlat= Math.random();
         const randomKarma=Math.floor(Math.random()*100);
         const loremIpsum= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
         //const minlong=60.148794; // Hardcoded coordinates in order to make the spawn possible only inside the Helsinki-Espoo Area
         //const minlat=24.7145656;
         //const maxlong=60.192220;
         //const maxlat=24.97077;
         // Even more specific coordinates to make the events appear in the Otaniemi area
         const minlong=60.179181; 
         const minlat=24.814066;
         const maxlong=60.190797;
         const maxlat=24.839547;
         const long=minlong+(maxlong-minlong)*ranlong;
         const lat=minlat+(maxlat-minlat)*ranlat;
         
         this.addEventMarker
         //const m = L.marker([long, lat],{icon: this.coloredMarker(colorClass, false)});
         //m.bindPopup("<b>Event "+i+"</b><br />"+loremIpsum+"<img src='./src/img/testimage.jpeg'/>"+
         //'<br/><button type="button" class="btn btn-primary sidebar-open-button" @click="test1" " ">karma: +'+randomKarma+' </button>');
         //m.addTo(this.map)
        }
      },
      addAccounts(Accounts){
        // Accounts:[{id:0, name:null,description:null,heatScore:0,guild:null}],
        Array.prototype.random = function () {
          return this[Math.floor((Math.random()*this.length))];
        }
        const guilds=["TIK","Prodeko","Arts","TF","Kone","AS","Fyysikkokilta"]
        const randomnamelist =["Kari Helminen","Auvo Miettinen", "Lari Suomalainen", "Ohto Suomalainen", "Ilppo Nurmi","Vaino Salmela",
                               "Kullervo Peltola", "Antero Ihalainen", "Martti Ihalainen","Vesa Viitala", "Asta Hänninen", "Talvikki Halonen",
                               "Liisi Ikonen", "Emmi Savela", "Marjaana Vanhatalo", "Irene Joutsen", "Hellin Terho", "Hannele Laurila",
                               "Matleena Miettinen","Vuokko Heikkinen"];
        //console.log("This is a test!")
        const test= {id:Accounts.length, name:randomnamelist.random(),description:"",heatScore:Math.floor(Math.random()*100)+1,guild:guilds.random()};
        //console.log(test.name)
        return test
      },
      coloredMarker(colorClass, showDot){
        const markerHtmlStyles = `
          width: 2rem;
          height: 2rem;
          display: block;
          left: -1rem;
          top: -1rem;
          position: relative;
          border-radius: 3rem 3rem 0;
          transform: rotate(45deg);
          border: 1px solid #FFFFFF`

        const icon = L.divIcon({
          iconAnchor: [0, 24],
          labelAnchor: [-6, 0],
          popupAnchor: [0, -36],
          html: `<div class="${colorClass} grid justify-items-center" style="${markerHtmlStyles}">${showDot ? '<div class="w-full h-full flex items-center"><div class="shadow-md shadow-inner bg-white w-1/3 h-1/3 rounded-full mx-auto"></div></div>': ''}</div>`
        })

        return icon
      },
      changeSelectLocationMarkerColorClass(newClass){
        if(!this.selectMarker){
          return;
        }

        const m = L.marker([this.selectMarker._latlng.lat, this.selectMarker._latlng.lng], {icon: this.coloredMarker(newClass.pinColor, true)}).addTo(this.map);

        this.map.removeLayer(this.selectMarker);
        this.selectMarker = m;
      },
      eventButtonClicked(event){
        const buttonID = event.srcElement.getAttribute("eventID");

        this.$emit("showEventData", this.dataForEvents[buttonID]);
      },
    },
    onBeforeUnmount() {
      if (this.map) {
        this.map.remove();
      }
    },
  };
</script>


<style>
/* REMOVE THIS IF PUBLISHING */
.leaflet-control-attribution {
  @apply hidden;
}
</style>