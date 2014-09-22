Hsichanglin::Application.routes.draw do

  root :to => 'home#index'

  get '/contact' => 'home#contact'
  get '/about' => 'home#about'
  get '/resume' => 'home#resume'

  get '/etr' => 'home#etr'
end
