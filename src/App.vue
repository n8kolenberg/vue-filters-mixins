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
                        enter-active-class="animated bounce"
                        leave-active-class="animated shake"
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
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from "./computeProperties.js";

    export default {
        mixins: [computed],
        data() {
            return {
                userInpReverseEx: "",
                userInpCountEx: "",
                show: true,
                slide: false,
                alertAnimation: ""
            }
        },
        filters: {
            reverseText(string) {
                return string.split("").reverse().join("");
            }
        },
        
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
