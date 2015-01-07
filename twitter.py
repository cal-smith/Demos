#!/usr/bin/python
import urllib2 as url
import urllib, json, base64, os, os.path, argparse, signal, textwrap

#lets us exit without spewing a stack trace
signal.signal(signal.SIGINT, lambda s, f: exit())

def search(q, access_token):
	query = url.Request("https://api.twitter.com/1.1/search/tweets.json?"+urllib.urlencode({"q":q}), None, {"Authorization":access_token})
	wrap = textwrap.TextWrapper()
	statuses = ""
	try:
		for status in json.loads(url.urlopen(query).read())["statuses"]:
			wrap.subsequent_indent = "".join([" " for x in range(len(status["user"]["screen_name"]) + 3)])
			statuses += wrap.fill("\033[0;34m@" + status["user"]["screen_name"] +"\033[1;m: "+ status["text"]) + "\n\n"
		return statuses
	except Exception, e:
		raise e

def init(key=None, secret=None):
	if os.path.isfile("access_token"):
		print "existing token found"
		while True:
			replace = raw_input("replace token? [y/n]: ")
			if replace.lower() == "y":
				os.remove("access_token")
				init(key, secret)
			else:
				access_token = open("access_token", "r").read()
				query(None, access_token)
	else:
		if not key:
			key = raw_input("consumer key: ")
		if not secret:
			secret = raw_input("consumer secret: ")
		client_token = "Basic " + base64.b64encode(key+":"+secret)
		req = url.Request("https://api.twitter.com/oauth2/token", urllib.urlencode({"grant_type":"client_credentials"}), {"Authorization":client_token})
		try:
			res = url.urlopen(req)
		except Exception, e:
			raise e
		access_token = "Bearer " + json.loads(res.read())["access_token"]
		open("access_token", "w").write(access_token)
		print "wrote access_token"
		query(None, access_token)

def query(args, token):
	if not args:
		print "interactive search"
		exit = False
		while not exit:
			q = str(raw_input("q: "))
			print search(q, token)
	else:
		print search(args, token)

parser = argparse.ArgumentParser(description="Command Line Twitter Search")
parser.add_argument("-i", "--i", action="store_true")
parser.add_argument("--init", action="store_true")
parser.add_argument("-k", "--key", metavar="consumer key")
parser.add_argument("-s", "--secret", metavar="consumer secret")
parser.add_argument("query", nargs="*")
args = parser.parse_args()

if args.init:
	init(args.key, args.secret)
else:
	if os.path.isfile("access_token"):
		access_token = open("access_token", "r").read()
		args = " ".join(args.query)
		query(args, access_token)
	else:
		print "no token found"
		init()