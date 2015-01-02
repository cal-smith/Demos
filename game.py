from __future__ import division
import sys, pygame
pygame.init()

size = width, height = 1280, 720
screen = pygame.display.set_mode(size)

class Move(object):
	def __init__(self, min_=0, max_=80, step=1):
		super(Move, self).__init__()
		self.min = min_
		self.max = max_
		self.pos = min_
		self.step = step
		self.rev = False
		
	def linear(self):
		if self.pos < self.max and self.rev == False:
			self.pos = self.pos + self.step
			return self.pos
		elif self.pos == self.max:
			self.rev = True

		if self.pos > self.min and self.rev == True:
			self.pos = self.pos - self.step
			return self.pos
		elif self.pos == self.min:
			self.rev = False
			return self.pos

	def point(self):
		if self.pos < self.max:
			self.pos = self.pos + self.step
			return self.pos
		return self.pos

def border_move(rect):
	screen.get_rect()

	if rect.right < size[0]:
		return rect.move(40, 0)
	if rect.right == size[0] and rect.bottom < size[1]:
		return rect.move(0, 40)

	if rect.bottom == size[1]:
		return rect.move(-40, 0)
	return rect

black = 0, 0, 0
blue = 0, 0, 255
white = 255, 255, 255
text = pygame.font.Font(None, 200)
top = Move(0, 50, 2)
rect = pygame.Rect(0, 0, 50, 100)

while 1:
	for event in pygame.event.get():
		if event.type == pygame.QUIT: sys.exit()

	screen.fill(black)
	rect = border_move(rect)
	pygame.draw.rect(screen, blue, rect, 0)

	#y = top.linear()
	#x = top.linear()
	#screen.blit(text.render("lel", True, white), (x, y))
	screen.blit(text.render("lel", True, white), (50, 50))
	
	pygame.display.flip()



