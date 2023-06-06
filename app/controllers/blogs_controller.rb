class BlogsController < ApplicationController
    before_action :find_blog, only: [:update, :destroy]
    before_action :unprocessable_entity_if_not_found, only: [:update, :destroy]
    skip_before_action :authorize, only: [:index]

    before_action only: [:update, :destroy] do
        authorize_user_resource(@blog.user_id)
    end

    def index
        if params[:user_id]
            user = User.find_by_id(params[:user_id])
            @blogs = user.blogs
        else
            @blogs = Blog.all
        end
        render json: @blogs
    end

    def create
        blog = current_user.blogs.create(blog_params)
        if blog.valid?
            render json: blog
        else
            render json: { errors: blog.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @blog.update(blog_params)
        render json: @blog, include: [:author]
    end

    def destroy
        @blog.destroy
        render json: @blog
    end

    private
    def blog_params
        params.require(:blog).permit(:title, :content)
    end

    def find_blog
        @blog = Blog.find_by_id(params[:id])
    end

    def unprocessable_entity_if_not_found
        render json: {  message: "Blog not found" }, status: :unprocessable_entity unless @blog
    end

end
