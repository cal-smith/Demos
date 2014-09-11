from bottle import *

admin = Bottle()

@admin.route('/')
def index():
	return '<p>Admin things</p>'