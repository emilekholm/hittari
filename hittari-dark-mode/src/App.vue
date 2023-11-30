<template>
  <div class="h-screen flex flex-col">
    <div class="grow relative">
      <Map ref="map" class="border-0 z-0" mapId="heatmap" :addToHeatmapOnClick="true" @showEventData="setAndShowEvent"></Map>
      
      <!-- <div class="absolute top-5 left-5">
        <button class="btn rounded-full w-full mb-1 font-bold px-12" :class="pingColorClass.pinColor" @click="pingLocation">Ping!</button>
      </div> -->
      <div class="absolute top-0 left-0 grid gap-2 p-2">
        <button class="px-1 text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600"  @click="addRandomUsers">Add Users</button>
        <button class="px-1 text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600"  @click="addRandomEvents">Add Events</button>
        <button class="px-1 text-white bg-blue-500 border border-transparent shadow-sm rounded hover:bg-blue-600"  @click="addRandomHeatoverlay">Heatmap random</button>
      </div>

      <div class="absolute bottom-5 left-1/2 -translate-x-1/2">
        <div class="flex gap-8">
          <button class="btn-standard rounded-full h-12 w-12 place-self-end" @click="() => {this.showNotificationModal = true;}"><i class="fas fa-bell text-xl"></i></button>
          <button class="btn-standard rounded-full h-16 w-16" @click="() => {this.showEventModal = true;}"><i class="fas fa-plus text-2xl"></i></button>
          <div class="place-self-end">
            <button class="btn-standard rounded-full h-12 w-12" @click="() => {this.showMessageModal = true;}"><i class="fas fa-comment text-xl"></i></button>
            <span class="bg-orange-400 py-1 px-2 rounded-full text-white absolute top-1 -right-1 text-xs font-bold">2</span>
          </div>
        </div>
      </div>

      <div class="absolute top-5 right-5">
        <div class="flex flex-col gap-3">
          <button class="btn p-0 w-20 h-20 overflow-hidden border-2" @click="() => {this.showUserModal = true;}">
            <img class="object-cover w-full h-full" :src="currentUser.imageSrc" />
          </button>
          <button class="place-self-end btn-standard w-10 h-10" @click="() => {this.showFilterModal = true;}">
            <i class="fas fa-sliders"></i>
          </button>
        </div>
      </div>
    </div>

    <Modal 
      :open="this.showEventModal"
      @cancelButton=" () => {this.showEventModal = false; this.emptyEventInformation()}"
      confirmText="Create"
      @confirmButton="createEvent"
      :showBottomButtons="true"
      maxWidthClass="sm:max-w-2xl md:max-w-3xl"
    >
      <p class="text-2xl text-white italic font-bold">New Event</p>
      <p class="text-lg text-gray-400 mb-4">Create an event of your own!</p>
      <div class="grid-cols-2 md:grid-cols-5 grid  gap-4 mb-4">
        <div class="col-span-1 md:col-span-2">
          <div class="flex flex-col gap-2">
            <div>
              <p class="text-base text-gray-400">Title <span class="text-orange-500 text-lg">*</span></p>
              <input-field class="mb-1" placeHolder="Name" v-model="eventName"></input-field>
            </div>
            <div>
              <p class="text-base text-gray-400">Description <span class="text-orange-500 text-lg">*</span></p>
              <textarea class="border rounded-md w-full p-1 outline-none focus:ring-2 ring-purple-600" placeHolder="Info" v-model="eventDescription"></textarea>
            </div>
            <div>
              <p class="text-base text-gray-400">Time</p>
              <input-field class="mb-1" type="time" placeHolder="" v-model="time"></input-field>
            </div>
            <div>
              <p class="text-base text-gray-400">Visibility</p>
              <multiselect 
                class="bg-transparent border-none outline-none p-0 m-0"
                v-model="eventCreationFilter" 
                :options="visibilityOptions" 
                :closeOnSelect="false" 
                mode="tags"
                :searchable="true"
                >
              </multiselect>
            </div>
            <div>
              <p class="text-base text-gray-400">Cover image</p>
              <input class="text-gray-400" ref="imageInput" type="file" accept=".png, .jpg, .jpeg">
            </div>
          </div>
        </div>
        <div class="col-span-1 md:col-span-3">
          <div class="h-full flex flex-col">
            <p class="text-base text-gray-400">Location <span class="text-orange-500 text-lg">*</span></p>
            <Map class="rounded-md h-full mb-1" mapId="eventMap" ref="eventMap" :isLocationSelector="true" :selectMarkerColorClass="eventColorClass.pinColor"></Map>
            <div class="grid grid-cols-6 gap-1">
              <button class="p-1 pb-2 rounded-md" :class="c.pinColor" @click.prevent="updateEventColorClass(c)" v-for="c in pingColorClasses" :key="c"></button>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <Modal 
      :open="showUserModal"
      @cancelButton=" () => {this.showUserModal = false; this.isEditingCurrentUser = false;}"
      maxWidthClass="sm:max-w-lg"
    >
      <div v-if="isEditingCurrentUser">
        <div class="relative w-full pb-36">
          <div class="absolute left-1/2 -translate-x-1/2 -translate-y-16">
            <div class="rounded-full p-0 w-48 h-48 overflow-hidden border-2" @click="() => {this.showUserModal = true;}">
              <img class="object-cover w-full h-full" :src="currentUser.imageSrc" />
              <button @click="() => {this.$refs.userImageInput.click()}" class="rounded-full absolute left-0 right-0 top-0 bottom-0 bg-white z-30 opacity-40">
                <i class="fas fa-camera text-5xl"></i>
              </button>
              <input type="file" hidden ref="userImageInput" @change="setUserImage"/>
            </div>
          </div>
        </div>
        <div class="text-center w-full mb-4">
          <input-field class="text-3xl text-white bg-transparent border-none text-center italic font-bold" v-model="currentUser.name"></input-field>
        </div>
        <div class="w-full mb-4">
          <input-field class="text-2xl text-gray-400 bg-transparent border-none text-center" placeholder="Guild" v-model="currentUser.guild"></input-field>
        </div>
        <div class="text-lg text-gray-400">
          <textarea class="h-32 p-1 border-none bg-transparent overflow-auto rounded-md w-full outline-none focus:ring-2 ring-purple-600" maxlength="200" placeHolder="Description" v-model="currentUser.decription"></textarea>
        </div>
        <div class="w-full grid">
          <button class="place-self-end relative btn p-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-400" @click="isEditingCurrentUser = false">
            <i class="text-white text-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fas fa-check"></i>
          </button>
        </div>
      </div>
      <div v-else>
        <div class="relative w-full pb-36">
          <div class="absolute left-1/2 -translate-x-1/2 -translate-y-16">
            <div class="rounded-full p-0 w-48 h-48 overflow-hidden border-2" @click="() => {this.showUserModal = true;}">
              <img class="object-cover w-full h-full" :src="currentUser.imageSrc" />
            </div>
          </div>
        </div>
        <div class="text-center w-full mb-4">
          <p class="text-3xl text-white italic font-bold p-1">{{currentUser.name}} <i v-if="currentUser.isVerified" class="relative fas fa-certificate text-blue-500"><i class="text-white text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fas fa-check"></i> </i></p>
        </div>
        <div class="w-full mb-4 px-16 flex place-content-center place-items-center text-gray-400">
          <p v-if="currentUser.guild != ''" class="text-2xl">{{currentUser.guild}}</p>
          <i v-if="currentUser.guild != ''" class="fas fa-circle px-4" style="font-size: 5px;"></i>
          <p class="text-2xl">HeatScore: {{currentUser.heatScore}}</p>
        </div>
        <div class="text-lg text-gray-400 mb-4">
          <p class="text-xl text-white mb-1">About me:</p>
          <p class="break-words">{{currentUser.decription}}</p>
        </div>
        <div class="w-full grid">
          <button class="place-self-end relative btn p-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-400" @click="isEditingCurrentUser = true">
            <i class="text-white text-3xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fas fa-pen"></i>
          </button>
        </div>
      </div>
    </Modal>

    <Modal 
      :open="showFilterModal"
      @cancelButton=" () => {this.showFilterModal = false; this.checkEmptyEventFilter()}"
      maxWidthClass="sm:max-w-lg"
    >
      <p class="text-2xl text-white italic font-bold mb-4">Event filters</p>
      <div class="grid gap-4">
        <div>
          <p class="text-white"><i class="fas fa-eye text-gray-400 mr-2"></i> Visibility</p>
          <multiselect 
            class="bg-transparent border-none outline-none p-0 m-0"
            v-model="eventFilter" 
            :options="visibilityOptions" 
            :closeOnSelect="false" 
            mode="tags"
            :searchable="true"
            >
          </multiselect>
        </div>
        <div>
          <p class="text-white mb-2"><i class="fas fa-user-check text-gray-400 mr-2"></i> Only show verified users</p>
          <button class="rounded-full border-2 border-purple-500 text-white py-1/2 px-5 mr-2" :class="onlyShowVerifiedUsers ? 'bg-purple-500' : ''" @click="onlyShowVerifiedUsers = true">Yes</button>
          <button class="rounded-full border-2 border-purple-500 text-white py-1/2 px-5" :class="!onlyShowVerifiedUsers ? 'bg-purple-500' : ''" @click="onlyShowVerifiedUsers = false">No</button>
        </div>
      </div>
    </Modal>

    <Modal 
      :open="showEventDataModal"
      @cancelButton=" () => {this.showEventDataModal = false;}"
      maxWidthClass="sm:max-w-lg"
    >
      <div class="flex place-content-between pr-6">
        <p class="text-2xl text-white italic font-bold mb-4">{{this.currentEvent.text}}</p>
        <p v-if="this.currentEvent.time && this.currentEvent.time != ''" class="text-2xl text-gray-400"><i class="fas fa-clock"></i> {{this.currentEvent.time}}</p>
      </div>
      <div class="grid gap-4">
        <div>
          <p class="text-gray-400">{{this.currentEvent.description}}</p>
        </div>
        <div>
          <img class="rounded-md" :src="this.currentEvent.image"/>
        </div>
        <div class="flex gap-2">
          <p class="text-white rounded-full bg-purple-500 px-3 py-1 font-bold text-sm" v-for="v in this.currentEvent.visibilityFilter" :key="v">{{v}}</p>
        </div>
        <div class="flex gap-2 place-items-center">
          <div class="h-9 w-9 rounded-full overflow-hidden border-2">
            <img class="object-cover h-full w-full" :src="this.currentEvent.creator.imageSrc"/>
          </div>
          <p class="text-white">{{this.currentEvent.creator.name}}</p>
          <i v-if="this.currentEvent.creator.isVerified" class="relative fas fa-certificate text-blue-500"><i style="font-size: 8px;" class="text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fas fa-check"></i> </i>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button @click="this.showEventDataModal = false;" class="btn-danger"><i class="fas fa-warning"></i> Report</button>
          <button @click="this.showEventDataModal = false;" class="btn-primary"><i class="fas fa-location-dot"></i> I'm joining!</button>
        </div>
      </div>
    </Modal>
  </div>
</template>


<script>
  import Map from "./components/Map.vue";
  import Navbar from "./components/Navbar.vue";
  import InputField from "./components/InputField.vue";
  import Modal from "./components/Modal.vue";
  
  import Multiselect from "@vueform/multiselect";

  export default {
    components: {
      Map,
      Navbar,
      InputField,
      Modal,
      Multiselect,
    },
    setup(){
      return {
        pingColorClasses: [
          {pinColor: 'bg-yellow-500'}, 
          {pinColor: 'bg-red-500'}, 
          {pinColor: 'bg-purple-500'}, 
          {pinColor: 'bg-blue-400'}, 
          {pinColor: 'bg-green-500'}, 
          {pinColor: 'bg-teal-600'},
        ]
      }
    },
    data() {
      return {
        // Event creation information
        eventName: "",
        pingColorClass: this.pingColorClasses[0],
        eventColorClass: this.pingColorClasses[0],
        eventCreationFilter: null,

        // Modal variables
        showEventModal: false,
        showNotificationsModal: false,
        showMessageModal: false,
        showUserModal: false,
        showFilterModal: false,
        showEventDataModal: false,
        
        // Event filters
        eventFilter: null,
        onlyShowVerifiedUsers: false,
        visibilityOptions: ["Everyone", "TiK", "TF", "ARTS"],

        // The current user
        isEditingCurrentUser: false, 
        currentUser: {
          name: "John Doe",
          isVerified: true,
          heatScore: 4390,
          decription: "Teekkari by day, teekkari by night 😎😎 Kolmannen vuoden tuotantotalouden opiskelija. Aallossa, harrastan kalastusta ja kiipeilyä.",
          imageSrc: "./src/img/testImage.jpeg",
          guild: "Inkubio"
        },
        
        // Other accounts
        Accounts:[{id:0, name:null,description:null,heatScore:0,guild:null}],
        
        // Current event data
        currentEvent: {
          text: "",
          description: "",
          image: "",
          time: undefined,
          creator: "",
        }
      }
    },
    mounted() {
      this.eventFilter = [].concat(this.visibilityOptions[0])
      this.eventCreationFilter = [].concat(this.visibilityOptions[0])
    },
    computed:{
      options(){
        return Object.keys(this.Accountsmap).map(k => {
        let o=this.Accountsmap[k]
        return `${o.name}`
        })

      }
      
    },
    methods: {
      pingLocation(){
        this.$refs.map.addCenterPointToHeatmap();
      },
      createEvent(){
        if(this.eventName == "" || this.eventDescription == "")
          return;

        const locationMarker = this.$refs.eventMap.selectMarker;
        
        if(!locationMarker)
          return;
        
        let imageFile = this.$refs.imageInput.files[0];
        console.log(imageFile);
        let imageURL = ""
        if(imageFile){
          if (
            imageFile.name.includes(".png") ||
            imageFile.name.includes(".jpg")
          ) {
            imageURL = URL.createObjectURL(imageFile);
          }
        }

        console.log(locationMarker._latlng);

        this.$refs.map.addEventMarker(locationMarker._latlng, this.eventName, this.eventColorClass.pinColor, this.eventDescription, imageURL, this.time, this.currentUser, this.eventCreationFilter);
        this.showEventModal = false;
        this.emptyEventInformation();
      },
      addRandomEvents(){
        for (let i=0; i<10;i++){

          const randomNumbers = (min,max) => {
            return Math.round(Math.random()*(max-min))+min;
          }
        
          // List of random names for events
          const listOfEvents=["Sitsi","Block party","Concert","Picnic","Crayfish party"]
          const ranlong= Math.random();
          const ranlat= Math.random();
          const randomKarma=Math.floor(Math.random()*500);
          const loremIpsum= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
          const minlong=60.179181; 
          const minlat=24.814066;
          const maxlong=60.190797;
          const maxlat=24.839547;
          const long=minlong+(maxlong-minlong)*ranlong;
          const lat=minlat+(maxlat-minlat)*ranlat;
          // Picking a random creator from accounts
          const indexOfCelebration=randomNumbers(0,listOfEvents.length-1)
          const idOfCreator=randomNumbers(1,this.Accounts.length-1)
          const randomCreator=this.Accounts[idOfCreator]
          console.log(idOfCreator)
          const point= new L.LatLng(long,lat)
          const eventColor = this.pingColorClasses[randomNumbers(0, this.pingColorClasses.length - 1)].pinColor;
          this.$refs.map.addEventMarker(point,listOfEvents[indexOfCelebration],eventColor,loremIpsum,"","",randomCreator)
        }
        
        //this.$refs.map.addTestMarkers(this.pingColorClass.pinColor,this.Accounts)
      },
      addRandomHeatoverlay(){ // Generating random heatmap in otaniemi
        for (let i=0; i<100;i++){
          const ranlong= Math.random();
          const ranlat= Math.random();
          const minlong=60.179181; 
          const minlat=24.814066;
          const maxlong=60.190797;
          const maxlat=24.839547;
          const long=minlong+(maxlong-minlong)*ranlong;
          const lat=minlat+(maxlat-minlat)*ranlat;
          const coord=new L.latLng(long,lat)
          this.$refs.map.addRandomHeatmap(coord)
        }
      },
      // By default the Random users adds 10 users with semirandom names and random heatscores. 
      addRandomUsers(){ 
        //this.Accountsmap.push(this.$refs.map.addAccounts1(this.Accounts))
        let amountOfAccounts=10
        for(let j=0; j<amountOfAccounts;j++){
          const test11= this.$refs.map.addAccounts(this.Accounts);
          this.Accounts.push(test11);
        }
        
        for(let i=0; i< this.Accounts.length; i++){
          console.log(this.Accounts[i].name)
          console.log(this.Accounts[i].id)
          console.log(this.Accounts[i].heatScore)
          console.log(this.Accounts[i].guild)
        }
      }
      ,
      updatePingColorClass(newClass){
        this.pingColorClass = newClass
      },
      updateEventColorClass(newClass){
        this.eventColorClass = newClass;

        this.$refs.eventMap.changeSelectLocationMarkerColorClass(newClass);
      },
      setUserImage(){
        let imageFile = this.$refs.userImageInput.files[0];
        let imageURL = ""
        if(imageFile){
          if (
            imageFile.name.includes(".png") ||
            imageFile.name.includes(".jpg")
          ) {
            imageURL = URL.createObjectURL(imageFile);
          }
        }
        console.log(imageURL)

        if(imageURL && imageURL != "")
          this.currentUser.imageSrc = imageURL;
      },
      checkEmptyEventFilter(){
        this.$nextTick(() => {
          console.log(this.eventFilter);
          if(!this.eventFilter || this.eventFilter.length == 0)
            this.eventFilter = [].concat(this.visibilityOptions[0]);
        })
      },
      emptyEventInformation(){
        this.eventName = "";
        this.eventDescription = "";
        this.time = "";
        this.eventCreationFilter = [].concat(this.visibilityOptions[0]);
      },
      setAndShowEvent(eventData){
        this.showEventDataModal = true;
        this.currentEvent = eventData;
      }
    }
  };
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
  .multiselect-tag {
    @apply bg-purple-500 rounded-full px-3 py-1;
  } 
  .multiselect-tags {
    @apply p-0;
  } 
  .multiselect-tags-search {
    @apply bg-transparent text-white;
  }
</style>