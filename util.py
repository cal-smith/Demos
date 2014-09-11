class Util(object):
	'''Utility functions'''
	def __init__(self, planet = "World"):
		super(Util, self).__init__()
		self.planet = planet

	def hello(self):
		return "Hello " + self.planet

		