export default {
	download: function(mime, data, filename) {
		var dataStr = "data: + " + mime + ";charset=utf-8," +
			encodeURIComponent(data);

		var anchorNode = document.createElement("a");
		anchorNode.setAttribute("href", dataStr);
		anchorNode.setAttribute("download", filename);

		document.body.appendChild(anchorNode);
		anchorNode.click();
		anchorNode.remove();
	}
};
