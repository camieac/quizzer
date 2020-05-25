
<template>

	<div id="app">
		<md-tabs class="md-accent" md-alignment="right">
			<md-tab id="tab-home" md-label="Home" to="/"></md-tab>
			<md-tab id="tab-pages" md-label="View All" to="/viewall"></md-tab>
			<md-tab id="tab-posts" md-label="Create" to="/create"></md-tab>
		</md-tabs>

		<div class="md-layout md-gutter">
			<div class="md-layout-item md-size-10">
			</div>
			<div class="md-layout-item md-size-80 md-elevation-20">
				<md-content>
					<router-view
						v-bind:quizes="quizes"
						v-on:update:quizes="updateQuizes"
						v-on:update:quiz="updateQuiz"
						v-on:clear:quizes="clearQuizes">
					</router-view>

				</md-content>
			</div>
			<div class="md-layout-item md-size-10">
			</div>
		</div>
		<div class="md-layout md-gutter">
			<div class="md-layout-item md-size-10">
			</div>
			<div class="md-layout-item md-size-80 md-elevation-20">

					You have not created any quizes yet! Click create to create your first quiz.

			</div>
			<div class="md-layout-item md-size-10">
			</div>
		</div>

	</div>
</template>

<script>

import Vue from 'vue'

export default {
	name: "app",
	components: {},
	data: function(){
		return {
			quizes: []
		};
	},
	mounted: function() {
		console.log(localStorage.getItem('quiz_player_quizes'));
		if (localStorage.getItem('quiz_player_quizes')) {
			try {
				this.quizes = JSON.parse(localStorage.getItem('quiz_player_quizes'));
				console.log("Found quiz data");
				console.log(typeof(this.quizes));
				console.log(JSON.stringify(this.quizes));
			} catch(e) {
				localStorage.removeItem('quiz_player_quizes');
			}
		} else {
			console.log("No data fround in local storage.");
		}
	},
	watch: {
		quizes(newQuizes) {
			localStorage.quiz_player_quizes = JSON.stringify(newQuizes);
			console.log("Quizes have been saved to local storage");
		}
	},
	methods: {
		updateQuizes: function(event) {
			console.log("Quiz has been updated");
			this.quizes = event;
		},
		clearQuizes: function(){
			this.quizes = [];
		},
		updateQuiz: function(id, quiz) {
			Vue.set(this.quizes, id, quiz);
		}
	}
};
</script>
