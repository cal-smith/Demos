import praw, json
from StringIO import StringIO

r = praw.Reddit("comment scraper bot thing 0.1 by /u/hansolo669")
stream = praw.helpers.comment_stream(r, "pics")
io = StringIO()
#io.write("[")
f = open("comments.txt", "a")
total = 1000
i = 0
for x in stream:
	#json.dump({"body":x.body}, io)
	#io.write(",") if i < total-1 else io.write("")
	f.write(x.body.encode('ascii', 'ignore')+" ")
	i += 1
	if i == total:
		break
#io.write("]")
#f.write(io.getvalue())
io.close()
f.close()