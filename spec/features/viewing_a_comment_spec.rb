require 'rails_helper'

feature 'Viewing an individual comment' do
  scenario 'should be one click away, errr something like that', js: true do
    Comment.create(author: "Ryan", comment: "Whatever!")
    Comment.create(author: "Josh", comment: "Rock Lobster!")

    visit '/'

    click_link 'Whatever!'

    expect(page).to have_content("Ryan")
    expect(page).to have_content("Whatever!")
    expect(page).to_not have_content("Rock Lobster!")
  end
end
