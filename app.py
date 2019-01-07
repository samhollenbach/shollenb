from flask import Flask, render_template, abort, send_from_directory


app = Flask(__name__)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.route('/<string:startPage>')
@app.route('/')
def home(startPage = None):
	pages = ['profile', 'experience', 'contact', 'music', 'baseball']
	if startPage is not None and startPage not in pages:
		return abort(404, "Page \'{}\' not found".format(startPage))
	return render_template("index.html", data={'startPage': startPage})


@app.route('/files/<path:path>')
def astro_paper(path):
	return send_from_directory('static/files', path)


@app.route('/visualizer')
def vis():
    return render_template("vis.html")





if __name__ == "__main__":
	app.run(debug=True)