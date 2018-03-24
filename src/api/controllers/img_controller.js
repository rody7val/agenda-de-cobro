exports.uploadImg = (req, res) => {
	res.json({
		path: req.file.path
	});
}
