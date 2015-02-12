Rails.application.routes.draw do

  root  'main#search'

  match '/search',      to: 'main#search',      via: [:get], as: 'search'
  match '/search/json', to: 'main#search_json', via: [:get, :post], as: 'search_json'

end