<template>
	<div id="app">
		<form>
		<md-field>
			<label for="name">Quiz Name</label>
			<md-input name="name" id="name" v-model="name"/>
		</md-field>
		<md-table md-card>
			<md-table-toolbar>
				<h1 class="md-title">Questions</h1>
			</md-table-toolbar>

			<!-- <md-table-row>
				<md-table-head>Type</md-table-head>
				<md-table-head>Contents</md-table-head>
				<md-table-head>Answer</md-table-head>
			</md-table-row> -->

			<!-- <md-steppers md-sync-route>
				<md-step id="tab-home" md-label="Home" to="/" exact></md-step>
				<md-step id="tab-create" md-label="Create" to="/create"></md-step>
				<md-step id="tab-save" md-label="Save" to="/save"></md-step>
				<md-step id="tab-present" md-label="Present" to="/present"></md-step>
			</md-steppers> -->

			<draggable v-model="questions" group="questions" @start="drag=true" @end="drag=false">
				<md-table-row v-for="question in questions" :key="question.index">
					<md-table-cell>
						<md-field>
							<md-select name="type" v-model="question.type">
								<md-option v-for="option in types" v-bind:value="option.value" v-bind:key="option.value">
									{{ option.text }}
								</md-option>
							</md-select>
							<label for="question-type" >Type</label>
						</md-field>
					</md-table-cell>
					<md-table-cell>
						<md-field v-if="question.type === 'text'">
							<label >Text</label>
							<md-input v-model="question.content" type="text" class="form-control"  placeholder="Question"></md-input>
						</md-field>
						<md-field v-if="question.type === 'image_link'">
							<label>Text</label>
							<md-input v-model="question.content" type="text" class="form-control"  placeholder="Image Source"></md-input>
						</md-field>
						<md-field v-if="question.type === 'audio_yt'">
							<label>YouTube ID</label>
							<md-input v-model="question.content" type="text" class="form-control"  placeholder="YouTube ID"></md-input>
						</md-field>
						<md-field v-if="question.type === 'image_local'">
						<label>Select image</label>
						<md-file v-model="placeholder" placeholder="Select image" />
						</md-field>
					</md-table-cell>
					<md-table-cell>
						<md-field>
							<label>Answer</label>
							<md-input v-model="question.answer" type="text" class="form-control"  placeholder="Answer"></md-input>
						</md-field>
					</md-table-cell>

				</md-table-row>
			</draggable>
		</md-table>
		<button @click="append" class="waves-effect waves-light btn">Add</button>

		<button @click="download" class="waves-effect waves-light btn">Download</button>
	</form>

		 <pre>{{questionString()}}</pre>

		 <md-button class="md-primary" @click="save">Save</md-button>

	</div>
</template>

<script>
import draggable from "vuedraggable";
import Vue from "vue";
import moment from "moment";
import utils from "../utils";

export default {
	name: "create",
	props: ["quizes"],
	components: {
		draggable
	},
	data: function() {
		return {
			id: 0,
			name: "",
			new: true,
			questions: [],
			types: [
				{ text: "Local Image", value: "image_local" },
				{ text: "Image Link", value: "image_link" },
				{ text: "Text", value: "text" },
				{ text: "Audio", value: "audio_yt" }
			]
		};
	},
	mounted: function() {
		if (this.$route.params.hasOwnProperty("id")) {
			this.id = this.$route.params.id;
			let quiz = this.quizes[this.id];
			this.questions = quiz.questions;
			this.name = quiz.name;
			this.new = false;
		} else {
			this.id = this.quizes.length;
		}
	},
	methods: {
		append: function(e) {
			this.questions.push({
				type: "text",
				answer: "",
				content: ""
			});
			e.preventDefault();
		},
		questionString: function() {
			return JSON.stringify(this.questions, null, 2);
		},
		download: function(id) {
			utils.download("text/json", this.questions, "quiz.json");
		},
		save: function() {
			var updatedQuizes = this.quizes;

			var quiz = {
				id: this.id,
				questions: this.questions,
				name: this.name,
				played: 0,
				created: moment().format()
			};

			if (this.new) {
				updatedQuizes.push(quiz);
				this.$emit("update:quizes", updatedQuizes);
			} else {
				updatedQuizes[this.id] = quiz;
				this.$emit("delete:quiz", this.id);
			}
		}
	}
};
</script>
