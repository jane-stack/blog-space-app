class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create]
    before_action :authorized, only: [:create]

    # POST /login
    def create
        user = User.find_by_username(params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: { errors: ["Username or Password didn't match"] }, status: :unprocessable_entity
        end
    end

    # DELETE /logout
    def destroy
        session.delete :user_id
    end

end
