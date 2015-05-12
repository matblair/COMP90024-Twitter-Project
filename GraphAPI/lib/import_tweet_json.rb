# Require appropriate files
require 'tweet_importer'

BUNCH_MAX = 300

# Find the file
file = ARGV[0]
count = 0
# Open that file
File.open(file, 'r') do |f|
  tweets = []
  while line = f.gets
    begin
      j = JSON.parse line
      tweets << j
      count += 1
      if tweets.count >= BUNCH_MAX
        TweetImporter.import_tweets tweets
        $stdout.puts "Succesfully imported #{tweets.count} tweets"
        tweets = []
      end
    rescue
      $stderr.puts "Cannot parse json for line"
    end
  end

  if not tweets.empty?
    TweetImporter.import_tweets tweets
    $stdout.puts "Succesfully imported #{tweets.count} tweets"
  end

  $stdout.puts "Succesfully imported a total of #{count} tweets."

end
