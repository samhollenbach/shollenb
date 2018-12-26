from flask import Flask, render_template


app = Flask(__name__)


@app.route('/<string:startPage>')
@app.route('/')
def home(startPage = None):
	pages = ['profile', 'experience', 'education', 'projects']
	if startPage is not None and startPage not in pages:
		return "404 Page Not Found"
	return render_template("index.html", data={'startPage': startPage})




if __name__ == "__main__":
	app.run(debug=True)