module.exports = function(app) {

    app.get('/note/view/:id', function(req, res) {
    	var id = req.params.id
        var item = app.data.bully[id]

        res.render('noteView.jade', {
            item: item
        })
    })

}