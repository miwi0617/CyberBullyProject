module.exports = function(app) {

    app.get('/note/list', function(req, res) {

        var bully = app.data.bully
        
        // TODO: calculate the correct array of page numbers for rendering the paginator

        res.render('noteList.jade', {
            bully : bully

        })
    })
}