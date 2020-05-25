<template>
	<div>
		<md-table v-if="quizesExist" md-card @md-selected="onSelect">
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
				</md-table-cell>
			</md-table-row>
		</md-table>

		<md-button class="md-primary" @click="clearAll">Clear All</md-button>
	</div>
</template>

<script>
export default {
	name: 'ViewAll',
	props: {
		quizes: {
			type: Array,
			default: []
		}
	},
	data: () => ({
		selected: {},
	}),
	mounted: function() {

	},
	methods: {
		onSelect (quiz) {
			this.selected = quiz
		},
		clearAll: function() {
			this.$emit('clear:quizes');
		},
		quizesExist: function() {
			let ret =  (this.quizes.length > 0);
			return ret;

		},
		play: function(id){
			console.log("playing " + id);
			this.$router.push({ name: 'play', params: { id } })
		},
		edit: function(id) {
			console.log("editing " + id);
			this.$router.push({ name: 'edit', params: { id } })
		}
	}
}
</script>

<style lang="scss" scoped>
  .md-table + .md-table {
    margin-top: 16px
  }
</style>
