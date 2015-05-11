Rails.application.routes.draw do
  # Routes for users
  get 'users' => 'users#index'
  get 'users/:user_id' => 'users#show'
  get 'users/:user_id/connections' => 'users#connections'

  # Routes for hashtags
  get 'hashtags/trending' => 'hashtags#trending'
  get 'hashtags/stats/:hashtag' => 'hashtags#show'

  # Routes for locations
  get 'locations' => 'locations#index'
  get 'locations/sentiment' => 'locations#sentiment'

  # Routes for topics
  get 'topics/:topic' => 'topics#show'
  get 'topics/:topic/trend' => 'topics#trend'
  get 'topics/:topic/extremes' => 'topics#extremes'
end
