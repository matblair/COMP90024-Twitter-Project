class User 
  include Neo4j::ActiveNode
  # Properties
  property :name, type: String
  property :twitter_id, type: String, index: :exact, constraint: :unique

  # Validations for uniqueness contrainsts
  validates_uniqueness_of :twitter_id
  validates :twitter_id, :presence => true

end
