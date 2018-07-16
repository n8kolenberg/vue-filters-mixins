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
                userInpCountEx: ""
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
</style>
