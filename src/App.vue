<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters & Mixins</h1>
                <!-- Exercise 1) -->
                <!-- Build a local Filter which reverses the Text it is applied on -->
                <h3>Reverse Text Locally</h3>
                <input type="text" v-model="userInpReverseEx">
                <h5>{{userInpReverseEx | reverseText(userInpReverseEx)}}</h5>
                <hr> 
                <br>
                <!-- Exercise 2 -->
                <!-- Build a global Filter which counts the length of a word and it appends it -->
                <!-- Like this: "Test" => Gets Filtered to => "Test (4)" -->
                <h3>Count the length - globally</h3>
                <input type="text" v-model="userInpCountEx">
                <h5>{{userInpCountEx | count-length(userInpCountEx)}}</h5>
                <hr>
                <br>
                <!-- Exercise 3 -->
                <!-- Do the same as in Exercises 1 & 2, now with Computed Properties -->
                <h3>Reverse Text and add length through Computed Property from Mixin</h3>
                <h5>{{computeReverseText}}</h5>
                <h5>{{computeStringCount}}</h5>
                <!-- Exercise 4 -->
                <!-- Share the Computed Property rebuilding Exercise 2 via a Mixin -->
            </div>

            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <hr>
                    <h3>Animations</h3>
                    <select class="form-control" name="SelectAnimation" id="selectAnimation" v-model="alertAnimation">
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                    </select>
                    <br>
                    <br>
                    <button class="btn btn-primary" @click="show = !show">
                        Show Fading Alert
                    </button>
                    <br>
                    <br>
                    <transition name="fade" appear> <!-- Transition allows you to animate anything that's between the opening and closing tag-->
                        <div class="alert alert-info" v-if="show">This comes through fixed fade in the code</div>
                    </transition>
                    <br>
                    <br>
                    <transition 
                        :name="alertAnimation"
                    > <!-- Transition allows you to animate anything that's between the opening and closing tag-->
                        <div class="alert alert-info" v-if="show">This comes through your dynamic animation selection</div>
                    </transition>
                    <br>
                    <br>
                    <transition 
                        enter-active-class="animated shake"
                        leave-active-class="animated bounce"
                    > <!-- Transition allows you to animate anything that's between the opening and closing tag-->
                        <div class="alert alert-info" v-if="show">This comes using animated.css</div>
                    </transition>
                </div>
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button class="btn btn-info" @click="slide = !slide">
                        Show Sliding Alert
                    </button>
                    <br>
                    <br>
                    <transition name="slide" mode="out-in"> <!-- mode="out-in" allows for the first element to be animated out before the new one gets animated in-->
                        <div class="alert alert-info" v-if="slide" key="info">This is some sliding alert through an info key</div>
                        <div class="alert alert-warning" v-else key="warning">This is some sliding warning through a warning key</div>
                    </transition>
                </div>
                <hr>
                <br>
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button class="btn btn-info" @click="jsLoad = !jsLoad">
                        Increase / Decrease Width through JS
                    </button>
                    <br>
                    <br>
                    <transition name="slide" 
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter"
                        @enter-cancelled="enterCancelled"

                        @before-leave="beforeLeave"
                        @leave="leave"
                        @after-leave="afterLeave"
                        @leave-cancelled="leaveCancelled"
                        :css="false"
                        > <!-- mode="out-in" allows for the first element to be animated out before the new one gets animated in-->
                        <div class="alert alert-info" v-if="jsLoad">This alert came through JavaScript</div>
                    </transition>
                </div>
                <hr>
                <hr>
                <br>
                <br>
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                    <button class="btn btn-primary" @click="selectedComponent == 'app-success-alert' ? selectedComponent = 'app-danger-alert' : selectedComponent = 'app-success-alert' ">Toggle Component</button> 
                    <br>
                    <br>
                    <transition name="fade" mode="out-in">
                        <component :is="selectedComponent"></component>
                    </transition>
                    <hr>
                    <br>

                    <button class="btn btn-primary" @click="addItem">Add Item</button>
                    <ul class="list-group">
                    <!-- Transition group allows you to animate more than 1 item at the same time -->
                        <transition-group name="slide">
                            <!-- We need to provide a dynamic unique key to each li for Vue to animate them individually-->
                            <li class="list-group-item"
                                v-for="(number,item) in numbers" 
                                @click="removeItem(item)"
                                style="cursor: pointer;"
                                :key="number"
                                >
                                {{number}}
                            </li>
                        </transition-group>
                    </ul>
                        
                </div>
                <hr>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from "./computeProperties.js"
import DangerAlert from "./DangerAlert.vue"
import SuccessAlert from "./SuccessAlert.vue"

    export default {
        mixins: [computed],
        data() {
            return {
                userInpReverseEx: "",
                userInpCountEx: "",
                show: true,
                slide: false,
                alertAnimation: "",
                jsLoad: false,
                elementWidth: 100,
                selectedComponent: "app-success-alert",
                numbers: [1, 2, 3, 4, 5, 6]

            }
        },
        filters: {
            reverseText(string) {
                return string.split("").reverse().join("");
            }
        },
        methods: {
            addItem() {
                let position = Math.floor(Math.random() * this.numbers.length);
                this.key += 1;
                this.numbers.splice(position, 0, this.numbers.length + 1);
            },
            removeItem(index) {
                this.numbers.splice(index, 1);
            },
            beforeEnter(el) {
                console.log("Before Enter");
                this.elementWidth = 100;
                el.style.width = this.elementWidth + "px";
            },
            enter(el, done) {
                console.log("Enter");
                let round = 1;
                const interval = setInterval(()=>{
                    el.style.width = (this.elementWidth + round * 10) + 'px';
                    round++;
                    if(round > 30) {
                        clearInterval(interval);
                        done();
                    }
                }, 20)
            },
            afterEnter(el) {
                console.log("After Enter");
                
            },
            enterCancelled(el) {
                console.log("Enter Cancelled");
            },


            beforeLeave(el) {
                console.log("Before Leave");
                this.elementWidth = 400;
                el.style.width = this.elementWidth + "px";

            },
            leave(el, done) {
                console.log("Leave");
                let round = 1;
                const interval = setInterval(()=>{
                    el.style.width = (this.elementWidth - round * 10) + 'px';
                    round++;
                    if(round > 20) {
                        clearInterval(interval);
                        done();
                    }
                }, 20)
            },
            afterLeave(el) {
                console.log("After Leave");
            },
            leaveCancelled(el) {
                console.log("Leave Cancelled");
            }  
        }, //End methods
        components: {
            'app-danger-alert': DangerAlert,
            'app-success-alert': SuccessAlert
        }
    }
</script>

<style>
/* enter, enter-active, leave and leave-active are default from Vue. What you put in before that, needs to be added as the value
of the name property on the transition tag */
.fade-enter {
    opacity: 0;
}

.fade-enter-active {
    transition: opacity 1s;
    /* opacity: 1; Not needed as the default is opacity: 1*/
}

.fade-leave {
    /* opacity: 1; Not needed as this is the default */
}

.fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
}


.slide-enter {
    opacity: 0;
}

.slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity 0.5s;
}

.slide-leave {

}

.slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 0.5s;
    opacity: 0;
    position: absolute;
}

.slide-move {
    transition: transform 1s;
}

@keyframes slide-in {
    from {
        transform: translateY(20px);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(20px);
    }
}



</style>
