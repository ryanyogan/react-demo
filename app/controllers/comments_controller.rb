class CommentsController < ApplicationController
  respond_to :json

  def index
    respond_with Comment.all
  end

  def create
    respond_with Comment.create(comment_params)
  end

  def show
    respond_with Comment.find(params[:id])
  end

  private
  def comment_params
    params.require(:comment).permit(:author, :comment)
  end
end
