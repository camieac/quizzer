<!-- Copyright 2020 Cameron A. Craig -->

<template>
	<div id="app">
		<md-tabs class="md-primary" md-alignment="right">
			<md-tab id="tab-home" md-label="Home" to="/"></md-tab>
			<md-tab id="tab-view-all" md-label="View All" to="/viewall"></md-tab>
			<md-tab id="tab-view-public" md-label="View Public" to="/viewpublic"></md-tab>
			<md-tab id="tab-create" md-label="Create" to="/create"></md-tab>
		</md-tabs>

		<div class="md-layout md-gutter">
			<div class="md-layout-item md-size-10">
			</div>
			<div class="md-layout-item md-size-80 md-elevation-20">
				<md-content>
					<router-view
						v-bind:publicQuizes="publicQuizes"
						v-bind:quizes="quizes"
						v-on:update:quizes="updateQuizes"
						v-on:update:quiz="updateQuiz"
						v-on:clear:quizes="deleteAllQuizes"
						v-on:show:error="showError"
						v-on:delete:quiz="deleteQuiz">
					</router-view>

				</md-content>
			</div>
			<div class="md-layout-item md-size-10">
			</div>
		</div>
		<div class="md-layout md-gutter">
			<div class="md-layout-item md-size-10">
			</div>
			<div id="copyright-text" class="md-layout-item md-size-80 md-elevation-20">
				Copyright 2020 Cameron A. Craig | <a href="https://github.com/camieac/quizzer">Github</a>
			</div>
			<div class="md-layout-item md-size-10">
			</div>
		</div>

		<md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="errorShow" md-persistent>
			<span>{{ errorMessage }}</span>
			<md-button class="md-primary" @click="showError = false">Close</md-button>
		</md-snackbar>

	</div>
</template>

<script>
import Vue from "vue";
import JsonSchema from "@hyperjump/json-schema"

export default {
	name: "app",
	components: {},
	data: function() {
		return {
			quizes: [],
			errorMessage: "An unknown error occurred!",
			errorShow: false,
			position: 'center',
			duration: 4000,
			isInfinity: false,
			publicQuizFiles: [
				"./quizes/wonders.json"
			],
			publicQuizes: [],
			publicPath: process.env.BASE_URL
		};
	},
	mounted: function() {
		console.log(localStorage.getItem("quiz_player_quizes"));
		if (localStorage.getItem("quiz_player_quizes")) {
			try {
				this.quizes = JSON.parse(localStorage.getItem("quiz_player_quizes"));
				console.log("Found quiz data");
				console.log(typeof this.quizes);
				console.log(JSON.stringify(this.quizes));
			} catch (e) {
				localStorage.removeItem("quiz_player_quizes");
			}
		} else {
			console.log("No data fround in local storage.");
		}
		console.log("Test");
		this.fetchAllPublic();

	},
	watch: {
		quizes(newQuizes) {
			localStorage.quiz_player_quizes = JSON.stringify(newQuizes);
			console.log("Quizes have been saved to local storage");
		}
	},
	methods: {
		fetchAllPublic: async function() {
			const schemaJson = {
				"$schema": "https://json-schema.org/draft/2019-09/schema",
				"$id": "http://example.com/schemas/string",
				"type": "string"
			};
			let schema = await this.loadQuizSchema();
			let isValidQuiz = await JsonSchema.validate(schema);
			let output = isValidQuiz("foo");

			// const output = await JsonSchema.validate(schema, "foo");
			if (output.valid) {
				console.log("Instance is valid :-)");
			} else {
				console.log("Instance is invalid :-(");
			}
			// console.log("process.env");
			// console.log(process.env);
			// const schema = await JsonSchema.get("http:// " + this.publicPath + "quiz.schema.json");
			// const schema = await JsonSchema.get(require("../public/quiz.schema.json").default);
			// const schema = await JsonSchema.get("http://" + this.publicPath + "quiz.schema.json");

			this.publicQuizFiles.forEach((url, id) => {
				console.log("Loading quiz data");
				this.fetchQuizData(url, id);
			});
		},
		loadQuizSchema: function() {
			return new Promise((resolve, reject) => {
				fetch("./quiz.schema.json")
					.then(res => res.json())
					.then((json) => {
						console.log(json);
						resolve(json);
					})
					.catch(err => {
						reject(err);
					});
			});

		},
		fetchQuizData: function(url, id) {
			fetch(url)
				.then(res => res.json())
				.then((quizJson) => {
					quizJson.id = id;
					this.publicQuizes.push(quizJson);
					console.log("Public quiz has been loaded");
				})
				.catch(err => {
					throw err;
				});
		},
		updateQuizes: function(event) {
			console.log("Quiz has been updated");
			this.quizes = event;
		},
		deleteAllQuizes: function() {
			this.quizes = [];
		},
		updateQuiz: function(id, quiz) {
			Vue.set(this.quizes, id, quiz);
		},
		deleteQuiz: function(id) {
			this.$delete(this.quizes, id);
			showError("Quiz with id " + id + " deleted");
		},
		showError: function(msg) {
			this.errorMessage = msg;
			this.errorShow = true;
		}
	}
};
</script>

<style>
#copyright-text {
	text-align: center;
}
</style>
