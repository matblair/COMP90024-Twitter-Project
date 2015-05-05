class UserDetective
  include Sidekiq::Worker

  def perform(user_id)
    # do something
    puts "what's up!"
  end
end