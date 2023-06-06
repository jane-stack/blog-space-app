Rails.application.routes.draw do
  
  resources :comments
  resources :blogs, except: [:show]
  resources :users, only: [:index]

  #User
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'

  #Session
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/users/:user_id/blogs', to: "blogs#index"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
