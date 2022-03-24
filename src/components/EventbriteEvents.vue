<template>

 <div class="relative px-4 sm:px-6 lg:px-8">
    <!-- <div class="absolute inset-0">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div> -->
    <div class="relative  mx-auto">
      <div class="text-center">
      </div>
      <div  v-if="events" class="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        <div v-for="(event, key)  in eventsToDisplay " :key='key' class="flex flex-col shadow-lg overflow-hidden"
            :class="{ 
              'rounded-lg' : roundedCard == true   
            }"
        >
          <div class="flex-shrink-0">
            <img v-if="event.logo == null" class="h-64 w-full object-cover" src="../assets/logo.png" alt="Event Image" />
            <img v-if="event.logo != null" class="h-64 w-full object-cover" :src="event.logo.original.url" alt="" />
          </div>
          <div class="flex-1 bg-white p-6 flex flex-col justify-between">
            <div class="flex-1">
              <!-- <a href="#" class="block mt-2"> -->
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
              <!-- </a> -->
              
            </div >
            <div class="mt-6">
              <button  v-if="roundedCard!=true" v-on:click="handleCheck(event.id)" :id="'eventbrite-widget-modal-trigger-'+event.id"
                class="px-4 py-4"
                :class="primaryColor "
                type="button"
                :style="{'background-color': hexColor }"
              >
                Buy Tickets
              </button>
              <button  v-if="roundedCard==true" v-on:click="handleCheck(event.id)" :id="'eventbrite-widget-modal-trigger-'+event.id"
                class="px-4 py-4 rounded-lg"
                :class="primaryColor "
                type="button"
                :style="{'background-color': hexColor }"
              >
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {getEvents, getOrganizations} from './../services/BriteService'
import { o_O} from './../Helpers'
import useFormatDate from "../composables/useFormatDate"
import useFormatDateTime from "../composables/useFormatDateTime"
import useFormatAMPM from "../composables/useFormatAMPM"
export default {
  name: 'Events',
  // props: {
  //   token:String,
  //   org: String,
  // },
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
      if (this.$route.query.view != null ) {
        return this.events.slice(0, 3);
      } else {
        return this.events;
      }
    },
    
    buttonColor: function() {
      return this.$route.params.buttonColor
    },

    roundedCard: function() {
       if (this.$route.query.rounded != null ) {
        return this.$route.query.rounded;
      } else {
        return true;
      }
    },
    hexColor: function() {
      return '#'+this.$route.params.hexColor
    },

    primaryColor: function(){
      return `bg-${this.$route.params.primaryColor}-800 text-white border-${this.$route.params.primaryColor}-800 hover:bg-${this.$route.params.primaryColor}-200 hover:text-${this.$route.params.primaryColor}-800 hover:border-${this.$route.params.primaryColor}-800`
    }
  },
    
    mounted(){      
        this.handleFetch(this.$route.params.orgId, this.$route.params.apiKey);
        this.handleFetchOrgs(this.$route.params.apiKey);

    },     
    
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


</style>