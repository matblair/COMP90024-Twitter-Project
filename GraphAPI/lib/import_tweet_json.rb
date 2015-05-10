# Require appropriate files
require 'tweet_importer'

# Find the file
file = ARGV[0]

# Open that file
File.open(file, 'r') do |f|
  tweets = []
  while line = f.gets
    begin
      j = JSON.parse line
      tweets << j
    rescue
      $stderr.puts "Cannot parse json for line"
    end
  end

  if not tweets.empty?
    TweetImporter.import_tweets tweets
    $stdout.puts "Succesfully imported #{tweets.count} tweets"
  end

end
