from bottle import *
from routes import app
from admin import admin
from util import Util

print Util("Mars").hello()

root = Bottle()
@root.route('/static/<file>')
def static(file):
	return static_file(file, root='static')
root.merge(app)
root.mount('/admin/', admin)

root.run(host='localhost', port=8080)