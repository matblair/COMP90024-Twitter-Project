class Tweet
  include Neo4j::ActiveNode
  # Our properties on our node
  property :twitter_id, type: String, index: :exact, constraint: :unique
  property :retweet, type: Boolean

  # Validations for uniqueness contrainsts
  validates_uniqueness_of :twitter_id
  validates :twitter_id, :presence => true

  # Named relationships
  has_many :in, :retweets, model_class: Tweet, origin: :original
  has_one :out, :original, model_class: Tweet, unique: true
  has_one :in, :user, unique: true, origin: :tweets
  has_many :out, :topics, model_class: Topic, origin: :tweets
  has_many :out, :mentions, model_class: User, origin: :mentions

  def add_retweet
  	# if !self.
  end


end
