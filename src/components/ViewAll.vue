<template>
	<div>
		<md-table v-if="quizesExist()" md-card @md-selected="onSelect">
			<md-table-toolbar>
				<h1 class="md-title">All Quizes</h1>
			</md-table-toolbar>

			<md-table-row v-for="quiz in quizes" md-selectable="single">
				<md-table-cell v-if="quiz" md-label="Name" md-sort-by="type">{{ quiz.name }}</md-table-cell>
				<md-table-cell v-if="quiz" md-label="Created" md-sort-by="created">{{ quiz.created }}</md-table-cell>
				<md-table-cell v-if="quiz" md-label="Played" md-sort-by="played">{{ quiz.played }}</md-table-cell>
				<md-table-cell v-if="quiz" md-label="Actions">
					<md-button class="md-primary" @click="play(quiz.id)">Play</md-button>
					<md-button class="md-primary" @click="edit(quiz.id)">Edit</md-button>
					<md-button class="md-primary" @click="download($event, quiz.id)">Download</md-button>
					<md-button class="md-primary" @click="del($event, quiz.id)">Delete</md-button>
				</md-table-cell>
			</md-table-row>
		</md-table>

		<md-button v-if="quizesExist()" class="md-primary" @click="clearAll">Delete All</md-button>
		<md-field v-if="quizesExist()">
			<label>Single</label>
			<md-file v-model="uploadFilename" v-on:md-change="upload"/>
		</md-field>

		<md-empty-state v-if="!quizesExist()"
			md-icon="help_outline"
			md-label="Create your first quiz"
			md-description="After creating your first quiz, it'll appear on this page.">
			<md-button to="/create" class="md-primary md-raised">Create first quiz</md-button>
		</md-empty-state>
	</div>
</template>

<script>
import moment from "moment";
import utils from "../utils";

export default {
	name: "ViewAll",
	props: {
		quizes: {
			type: Array,
			default: []
		}
	},
	data: () => ({
		selected: {},
		uploadFilename: "",
	}),
	mounted: function() {},
	methods: {
		onSelect(quiz) {
			this.selected = quiz;
		},
		clearAll: function() {
			this.$emit("clear:quizes");
		},
		quizesExist: function() {
			let ret = (this.quizes.length > 0);
			console.log("length: " + this.quizes.length);
			return ret;
		},
		play: function(id) {
			console.log("playing " + id);
			this.$router.push({ name: "play", params: { id } });
		},
		edit: function(id) {
			console.log("editing " + id);
			this.$router.push({ name: "edit", params: { id } });
		},
		upload: function(files) {
			console.log(files);
			if (files.length <= 0) {
				return false;
			}

			let fr = new FileReader();

			fr.onload = this.fileLoaded;
			fr.readAsText(files.item(0));
		},
		fileLoaded: function(e) {
			console.log(e);
			var result = JSON.parse(e.target.result);
			var formatted = JSON.stringify(result, null, 2);
			console.log(formatted);
			if (!result.hasOwnProperty("created")) {
				result.created = moment().format();
			}
			if (!result.hasOwnProperty("played")) {
				result.played = 0;
			}
			if (!result.hasOwnProperty("name")) {
				result.name = "Unnamed Quiz";
			}
			// If a file does not have any questions, it is no use!
			if (!result.hasOwnProperty("questions")) {
				this.$emit("show:error", "Uploaded file does not contain any questions!");
			}

		},
		download: function(event, id) {
			let quiz = this.quizes[id]
			utils.download("text/json", JSON.stringify(quiz), "quiz.json");
			event.preventDefault();
		},
		del: function(event, id) {
			this.$emit("clear:quizes");
		}
	}
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
</style>
