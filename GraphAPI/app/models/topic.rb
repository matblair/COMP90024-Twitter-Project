class Topic 
  include Neo4j::ActiveNode
  # Basic property
  property :tag, type: String

  # Relationship to tweets
  has_many :in, :tweets, model_class: Tweet, type: "references"

end
