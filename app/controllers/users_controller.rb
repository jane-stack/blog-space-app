class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]
    before_action :authorized, only: [:create]

    def index
        render json: User.all
    end

    # GET /me
    def show
        render json: current_user
    end

    # POST /signup
    def create
        user = User.new(user_params)
        if user.save
            session[:user_id] = user.id
            render json: user, status: 201
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private
    def user_params
        params.permit(:username, :password)
    end
end
