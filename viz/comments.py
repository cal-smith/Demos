import praw, json, argparse
from StringIO import StringIO

parser = argparse.ArgumentParser(description="Reddit comment scraper")
parser.add_argument("-t", "--total", metavar="total number of comments to get")
parser.add_argument("-r", "--reddit", metavar="subreddit to scrape")
args = parser.parse_args()

r = praw.Reddit("comment scraper bot thing 0.2 by /u/hansolo669")
sub = "pics" if not args.reddit else args.reddit
stream = praw.helpers.comment_stream(r, sub)
ft = open("comments_"+sub+".txt", "a")
fj = open("comments_"+sub+".json", "w")
total = 2000 if not args.total else args.total
i = 0
io = StringIO()
io.write("[")

for x in stream:
	json.dump({"body":x.body,"score":x.score}, io)
	io.write(",") if i < total-1 else io.write("")
	ft.write(x.body.encode('ascii', 'ignore')+" ")
	i += 1
	if i == total:
		break
io.write("]")
fj.write(io.getvalue())
io.close()
ft.close()