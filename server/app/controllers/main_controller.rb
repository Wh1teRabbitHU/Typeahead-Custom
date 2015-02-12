class MainController < ApplicationController

  def search
  end

  def search_json
    array  = search_in_array TEST_ARRAY, params[:_json]
    render json: array
  end

  private

  TEST_ARRAY = [
    {id: 1,  value: "Alma"},
    {id: 7,  value: "Apple"},
    {id: 2,  value: "Bananna"},
    {id: 65, value: "Burn"},
    {id: 5,  value: "Citrom"},
    {id: 6,  value: "Dio"},
    {id: 10, value: "Eper"},
    {id: 13, value: "Fahej"},
    {id: 45, value: "Gear"},
    {id: 23, value: "Korte"}
  ]

  def search_in_array array, filter
    result = []
    array.each do |a|
      if filter.nil? || a[:value].downcase.start_with?(filter.downcase)
        result.push a
      end
    end
    return result
  end

end