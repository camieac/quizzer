<template>
	<div id="app">
		<section>
			<h2>Getting Started</h2>
			<p>This website allows you to create quizes to play with friends.</p>

			<h3>Creating a quiz</h3>
			<p>Click here or on the create button above to create a quiz.</p>
			<p>Quizes can be a mixture of text-based, image-based, and audio-based questions.</p>

			<h3>Saving a quiz</h3>
			<p>After spending time creating your quiz, you want to make sure your work is not lost.</p>
			<p>When your quiz is saved, it is stored in your browsers local storage.
				If you were to clear your browser cache, or click the clear all button, your quiz data would be lost.</p>
			<p>Quiz data can be downloaded to your PC.</p>
			<p>Quizes can also be added to our selection of shared quizes, via a Pull Request.</p>
		</section>

		<section>
			<h2>Technology</h2>
			<p>This application use the <a href="https://vuejs.org/">Vue.js Javascript Framework</a>
				and a <a href="https://vuematerial.io/">Material Design library for Vue.js</a></p>
		</section>

	</div>
</template>

<script>
import Vue from "vue";

export default {
	name: "home",
	components: {},
	data: function() {
		return {};
	},
	methods: {}
};
</script>
