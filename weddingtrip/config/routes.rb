Rails.application.routes.draw do
  get "packages/index"
  root "home#index"
  # Other routes...

  resources :packages, only: [ :index ]
end
