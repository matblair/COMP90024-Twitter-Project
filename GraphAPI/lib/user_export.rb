# Simple exporter to output user data
File.open(ARGV[0],"w") do |f|
	User.all.each do |u|
		f.puts("#{u.twitter_id}")
	end
end
