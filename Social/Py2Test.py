import tweepy
import json
import time
##Created for Python 2.X

logstring = time.strftime("%H:%M:%S - %d-%m-%Y |---| ")

# Authentication details. To  obtain these visit dev.twitter.com
consumer_key = 'ygm0W4GzdQIHLh2pHAxpvQ7lv'
consumer_secret = '7mSidWqdM2H1q47QcBXLEISLY3piykWdvC9ShyidQjONAWoUTK'
access_token = '3360058211-m0nkx4Enw9J0tDi5FPEhfzc9z1fChbyxvETfLgX'
access_token_secret = 'oP64ioPWHgOJezVqLD8aekTI6SbHhaJSDSiJGz7jDINQV'
TWK = ['testing', 'test', 'HM']

# This is the listener, resposible for receiving data
class StdOutListener(tweepy.StreamListener):
    def on_data(self, data):
        # Twitter returns data in JSON format - we need to decode it first
        decoded = json.loads(data)

        # Also, we convert UTF-8 to ASCII ignoring all bad characters sent by users
        print logstring + '@%s: %s' % (decoded['user']['screen_name'], decoded['text'].encode('ascii', 'ignore'))
        print ''
        return True

    def on_error(self, status):
        print status

if __name__ == '__main__':
    l = StdOutListener()
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    print "Showing all new tweets for keyword(s):"+ TWK

    # There are different kinds of streams: public stream, user stream, multi-user streams
    # In this example follow #programming tag
    # For more details refer to https://dev.twitter.com/docs/streaming-apis
    stream = tweepy.Stream(auth, l)
    stream.filter(track={TWK})
