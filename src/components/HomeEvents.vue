<template>

 <div class="relative bg-gray-50 px-4 sm:px-6 lg:px-8">
    <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="relative  mx-auto">
      <div class="text-center">
        <!-- <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Events</h2> -->
        <!-- <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.</p> -->
      </div>
      <div  v-if="events" class="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        <div v-for="(event, key)  in eventsToDisplay " :key='key' class="flex flex-col  shadow-lg overflow-hidden">
          <div class="flex-shrink-0">
            <img v-if="event.logo == null" class="h-64 w-full object-cover" src="../assets/logo.png" alt="Event Image" />
            <img v-if="event.logo != null" class="h-64 w-full object-cover" :src="event.logo.original.url" alt="" />
          </div>
          <div class="flex-1 bg-white p-6 flex flex-col justify-between">
            <div class="flex-1">
              <!-- <p class="text-sm font-medium text-indigo-600">
                <a href="#" class="hover:underline">
                  {{ event.name.text }}
                </a>
              </p> -->
              <a href="#" class="block mt-2">
                <p class="text-xl font-semibold text-gray-900">
                  {{ event.name.text }}
                </p>
                <div class="flex space-x-1 justify-center text-sm text-gray-500">
                  <p>
                  <time :datetime="event.start.utc">
                    {{ formatDate(event.start.utc) }}
                  </time>
                  <span aria-hidden="true"> &middot; </span>
                  <span> {{ formatAMPM(event.start.utc) }}<span aria-hidden="true"> &middot; </span>({{event.start.timezone}})</span>
                  </p>
                </div>
                <!-- <p class="mt-3 text-base text-gray-500">{{formatDate(event.start.utc)}}</p>
                <p class="mt-3 text-base text-gray-500">{{formatAMPM(event.start.utc)}}({{event.start.timezone}})</p> -->

              </a>
              
            </div >
            <div class="mt-6"><button v-on:click="handleCheck(event.id)" :id="'eventbrite-widget-modal-trigger-'+event.id" type="button">Buy Tickets</button></div>
            <!-- <div class="mt-6 flex items-center">
              <div class="flex-shrink-0">
                <a href="#">
                  <span class="sr-only">{{event.name.text }}</span>
                  <img  v-if="event.logo != null" class="h-10 w-10 rounded-full" :src="event.logo.original.url" alt="" />
                </a>
              </div>
              <div class="ml-3">
                <button v-on:click="handleCheck(event.id)" :id="'eventbrite-widget-modal-trigger-'+event.id" type="button">Buy Tickets</button>

                <p class="text-sm font-medium text-gray-900">
                  <a href="#" class="hover:underline">
                    placeholder
                  </a>
                </p>
                <div class="flex space-x-1 text-sm text-gray-500">
                  <time :datetime="event.start.utc">
                    {{ formatDate(event.start.utc) }}
                  </time>
                  <span aria-hidden="true"> &middot; </span>
                  <span> {{ formatAMPM(event.start.utc) }}</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {getEvents, getOrganizations} from './../services/BriteService'
import {loadExternalScript, o_O} from './../Helpers'
import useFormatDate from "../composables/useFormatDate"
import useFormatDateTime from "../composables/useFormatDateTime"
import useFormatAMPM from "../composables/useFormatAMPM"
export default {
  name: 'Events',
  props: {
    token:String,
    org: String,
  },
  setup() {
    const {formatAMPM} = useFormatAMPM()
    const {formatDate} = useFormatDate()
    const {formatDateTime} = useFormatDateTime()
    const {getTime} = useFormatDateTime()

    return {      
      formatDate,
      formatDateTime,
      getTime,
      formatAMPM,
    };
  },
  data(){
      return{
          events: [],
          error: null,
          response: null,
          pt:' 3R6GWLGHDXGP5GM3SN2UK5JQJFHOK4RKMOZXXTIG72NIAOZMTC',
          organizations:null,
          eventlength:null
      //     exampleCallback : function() {
      // console.log('Order complete!');
      //   }
      }
  },
  methods:{

    exampleCallback:function() {
        console.log('Order complete!');
    },
    handleCheck(x){
      var parentWindow = window.parent;
      parentWindow.postMessage(x, "*")
      // console.log(x)
    //     window.EBWidgets.createWidget({
    //     widgetType: 'checkout',
    //     eventId: x,
    //     modal: true,
    //     modalTriggerElementId: 'eventbrite-widget-modal-trigger-' + x,
    //     onOrderComplete: this.exampleCallback
    // });
    },

      async handleFetch(x,y){
        // console.log(y)
        let [err, data] = await o_O(getEvents(x,y));
              if(err){
                  this.error = err.response.data;
                  this.response = null;
              }else{
                this.events = data.data.events.reverse()
                this.eventlength = this.events.length
              }

              
        // return getEvents()
      },
      async handleFetchOrgs(x){
        let [err, data] = await o_O(getOrganizations(x));
              if(err){
                  this.error = err.response.data;
                  this.response = null;
              }

              this.organizations = data
        // return getEvents()
      },
       
  },
  computed: {
    eventsToDisplay: function() {
      // console.log(this.events.data.events.length-4)
      if (this.$route.query.view != null ) {
        return this.events.slice(0, 3);
      } else {
        return this.events.slice(0, 3);
      }
    }    
  },
    
    mounted(){      
      loadExternalScript('https://www.eventbrite.com/static/widgets/eb_widgets.js', 'eventbrite')
        this.handleFetch('144370389754', 'FYE26YJH3ZU4ULOYNERD');
        this.handleFetchOrgs('FYE26YJH3ZU4ULOYNERD');
    },     
    
    // beforeUnmount() {
    //   unloadScript('https://www.eventbrite.com/static/widgets/eb_widgets.js')
    // }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  /* background-color: aquamarine; */
}

h3 {
  background-color: azure;
  margin: 40px 0 0;
  padding: 40px;
  opacity: 0.6;
  /* height: 60px; */
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* .card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  background-image: url(../assets/logo.png);
  background-size: contain;
  background-position: center;
  background-size: auto;
  background-repeat: no-repeat;
  width: 300px;
  height: 300px; 

  
} */
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  /* width: 350px; */
 
}

/* On mouse-over, add a deeper shadow */
/* .card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
} */

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
  height: 250px; 
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.container {
  /* padding: 2px 16px; */
   /* padding-top: 300px; */
  padding-top: auto;
  padding-bottom: auto;

}

.flex-container {
  /* display: flex; */
  /* width: 1200px;  */
  margin:auto;
  /* background-color: #2c3e50; */
  /* position:absolute */
}

.grid-container {
  display: grid;
  column-gap: 50px;
}


/* Container for flexboxes */
.row {
  display: -webkit-flex;
  display: flex;
  
}

/* Create three equal columns that sits next to each other */
.column {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 10px;
  /* position: relative; */

  /* Should be removed. Only for demonstration */
}

/* Style the footer */
.footer {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media  (max-width: 600px) {
  .row {
    -webkit-flex-direction: column;
    flex-direction: column;
  }
  .card {
    height: 500px; 
  }

  /* .container { */
  /* padding: 2px 16px; */
   /* padding-top: 50px;
  } */
}

img {
    max-width: 100%;
    /* height: 200px; */
    background-color: #42b983;
    /* max-height: 100%; */
}

button{
  background-color: cadetblue;
  padding:20px 40px;
  font-size: large;
  color:white;
  border: none;
  opacity: 0.6;
  
}

@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro|Oswald);

/****************************************/
/* Styling rules, such as font and colors */
.date-as-calendar {
  font-variant: normal;
  font-style: normal;
  font-weight: normal;
  font-family: "Helvetica", "Arial", sans-serif;

  /* It seems vertical-align: baseline does not work correctly with display: inline-flex. */
  vertical-align: top;

  /* margin: 1ex; */

  color: black;
  background: white;
  background : linear-gradient(to bottom right, #FFF 0%, #EEE 100%);

  border: 1px solid #888;
  border-radius: 3px;
  overflow: hidden;
  /* float:left; */
  box-shadow: 2px 2px 2px -2px black;
}
.date-as-calendar .weekday,
.date-as-calendar .day,
.date-as-calendar .month,
.date-as-calendar .year {
  text-align: center;
  line-height: 1.0;
}
.date-as-calendar .month {
  font-family: "Oswald", sans-serif;
  text-transform: uppercase;
  background: #B11;
  background : linear-gradient(to bottom right, #D66 0%, #A00 100%);
  color: white;
}

/****************************************/
/* Layout rules using position: absolute and pixels. */
.position-pixels.date-as-calendar {
  display: inline-block;
  z-index: 2;
  position: relative;
  width: 64px;
  height: 64px;
}
.position-pixels.date-as-calendar .weekday,
.position-pixels.date-as-calendar .day,
.position-pixels.date-as-calendar .month,
.position-pixels.date-as-calendar .year {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 1em;
}
.position-pixels.date-as-calendar .month {
  top: 0px;
  font-size: 12px;
  padding: 2px 0;
}
.position-pixels.date-as-calendar .weekday {
  top: 16px;
  font-size: 10px;
}
.position-pixels.date-as-calendar .day {
  top: 26px;
  font-size: 24px;
}
.position-pixels.date-as-calendar .year {
  top: 50px;
  font-size: 14px;
}

/****************************************/
/* Layout rules using position: absolute and relative dimensions using em. */
.position-em.date-as-calendar {
  display: inline-block;
  position: relative;
  
  width: 4em; 
  height: 4em; 
}
.position-em.date-as-calendar .weekday,
.position-em.date-as-calendar .day,
.position-em.date-as-calendar .month,
.position-em.date-as-calendar .year {
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 1em;
}
.position-em.date-as-calendar .month {
  top: 0px;
  font-size: 0.75em;
  padding: 0.1em 0;
}
.position-em.date-as-calendar .weekday {
  top: 1.6em;
  font-size: 0.6125em;
}
.position-em.date-as-calendar .day {
  top: 1.1em;
  font-size: 1.5em
}
.position-em.date-as-calendar .year {
  bottom: 0px;
  font-size: 0.87750em;
}

/****************************************/
/* Layout rules using display: inline-flex and relative dimensions using em. */
.inline-flex.date-as-calendar {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  
  width: 4em; 
  height: 4em; 
}
.inline-flex.date-as-calendar .weekday,
.inline-flex.date-as-calendar .day,
.inline-flex.date-as-calendar .month,
.inline-flex.date-as-calendar .year {
  display: block;
  flex: 1 1 auto;
}
.inline-flex.date-as-calendar .month {
  order: 1;
  font-size: 0.75em;
  padding: 0.1em 0;
}
.inline-flex.date-as-calendar .weekday {
  order: 2;
  font-size: 0.6125em;
}
.inline-flex.date-as-calendar .day {
  order: 3;
  font-size: 1.5em;
}
.inline-flex.date-as-calendar .year {
  order: 4;
  font-size: 0.87750em;
}

.float-left{
  float: left;
  clear: both;
}

/****************************************/
/* Multiple sizes. */
.date-as-calendar.size0_5x {
  font-size: 8px;
}
.date-as-calendar.size0_75x {
  font-size: 12px;
}
.date-as-calendar.size1x {
  font-size: 16px;
}
.date-as-calendar.size1_25x {
  font-size: 20px;
}
.date-as-calendar.size1_5x {
  font-size: 24px;
}
.date-as-calendar.size1_75x {
  font-size: 28px;
}
.date-as-calendar.size2x {
  font-size: 32px;
}
.date-as-calendar.size3x {
  font-size: 48px;
}
</style>