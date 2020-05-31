<template>
	<div>
		<md-table v-if="quizesExist()" md-card @md-selected="onSelect">
			<md-table-toolbar>
				<h1 class="md-title">All Public Quizes</h1>
			</md-table-toolbar>

			<md-table-row v-for="quiz in publicQuizes" md-selectable="single">
				<md-table-cell v-if="quiz" md-label="Name" md-sort-by="type">{{ quiz.name }}</md-table-cell>
				<md-table-cell v-if="quiz" md-label="Created" md-sort-by="created">{{ quiz.created }}</md-table-cell>
				<md-table-cell v-if="quiz" md-label="Played" md-sort-by="played">{{ quiz.played }}</md-table-cell>
				<md-table-cell v-if="quiz" md-label="Actions">
					<md-button class="md-primary" @click="play(quiz.id)">Play</md-button>
				</md-table-cell>
			</md-table-row>
		</md-table>

		<md-empty-state v-if="!quizesExist()"
			md-icon="help_outline"
			md-label="No quizes available"
			md-description="There are currently no public quizes available. Create a public quiz by creating a pull request.">
			<md-button href="https://github.com/camieac/quizzer/compare" class="md-primary md-raised">Create pull request</md-button>
		</md-empty-state>
	</div>
</template>

<script>
import moment from "moment";
import utils from "../utils";

export default {
	name: "ViewPublic",
	props: {
		quizes: {
			type: Array,
			default: []
		},
		publicQuizes: {
			type: Array,
			default: []
		}
	},
	data: () => ({

	}),
	mounted: function() {

	},
	methods: {
		onSelect(quiz) {
			this.selected = quiz;
		},
		quizesExist: function() {
			let ret = (this.publicQuizes.length > 0);
			return ret;
		},
		play: function(id) {
			this.$router.push({ name: "play", params: { id }, query: {pub: true} });
		}
	}
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
</style>
