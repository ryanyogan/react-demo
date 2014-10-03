require 'rails_helper'

feature 'Creating a comment' do
  scenario 'can create a comment with valid data', js: true do
    visit '/'

    expect(page).to have_content("Comments")

    fill_in 'author', with: 'Ryan Yogan'
    fill_in 'comment', with: 'Rock Lobster!'

    click_button 'Post'
    expect(page).to have_content('Rock Lobster!')
  end
end
