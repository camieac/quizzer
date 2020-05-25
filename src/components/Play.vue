<template>
<div>
	<p>{{name}}</p>
  <!-- <div class="card-expansion">
	  <p>Showing quiz {{$route.params.id}}</p>
    <md-card>
      <md-card-media>
        <img src="https://vuematerial.io/assets/examples/card-image-1.jpg" alt="People">
      </md-card-media>

      <md-card-header>
        <div class="md-title">Title goes here</div>
        <div class="md-subhead">Subtitle here</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button>Action</md-button>
          </div>

          <md-card-expand-trigger>
            <md-button>Learn more</md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card> -->
  <!-- </div> -->
	<vueper-slides>
		<!-- <template v-slot:arrow-left>
			<i class="icon icon-arrow-left" />
		</template>

		<template v-slot:arrow-right>
			<i class="icon icon-arrow-right" />
		</template> -->

		<vueper-slide
			v-for="(question, i) in questions"
			:key="i"
			:title="question.content"
			:style="'background-color: ' + colours[i % colours.length]"
			/>

		<!-- <template v-slot:bullet="{ active, slideIndex, index }">
			<i class="icon">{{ active ? 'check_circle' : 'radio_button_unchecked' }}</i>
		</template> -->
	<!-- <button>Show Answer</button> -->
	</vueper-slides>
</div>
</template>

<script>
import Vue from 'vue'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
	name: "present",
	props: {
		quizes: {
			type: Array,
			default: []
		}
	},
	components: {VueperSlides, VueperSlide},
	data: function(){
		return {
			slides: [],
			name: "",
			questions: [],
			id: 0,
			colours: ["red", "blue", "green"]
		};
	},
	methods: {},
	watch: {
		$route(to, from) {
			// react to route changes...
			console.log("Route changed from " + from + " to " + to);
		}
	},
	mounted: function() {
		let quiz = this.quizes[this.id];
		console.log("quizes");
		console.log(this.quizes);
		console.log("quiz");
		console.log(quiz);

		this.name = quiz.name;
		this.questions = quiz.questions;
		console.log("questions");
		console.log(this.questions);
		// for (const [i, v] of quiz.questions.entries()) {
		// 	console.log(i, v); // Prints "0 a", "1 b", "2 c"
		// }
	}
};
</script>

<style lang="css" scoped>
  /* .vueperslides__arrow {color: yellow} */

  /* .vueperslides__bullet .default {
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  box-shadow: none;
  transition: 0.3s;
  width: 16px;
  height: 16px;
}

.vueperslides__bullet--active .default {background-color: #42b983;}

.vueperslides__bullet span {
  display: block;
  color: #fff;
  font-size: 10px;
  opacity: 0.8;
} */
</style>
