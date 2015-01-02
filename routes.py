from bottle import *

app = Bottle()

@app.route('/')
def index():
	return '<p>Hello</p>'