Hsichanglin::Application.routes.draw do

  root :to => 'home#index'

  get '/contact' => 'home#contact'
end
