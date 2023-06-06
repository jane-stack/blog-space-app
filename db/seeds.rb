# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

#USERS
jane = User.create(username: "janeur", password: "Testing12345#")
jimmy = User.create(username: "jvng", password: "Testing12345$")

#BLOGS
janeb1 = jane.blogs.create(title: "Welcoming a New Beginning", content: "Everything turned out different from what we expected. We are now back to where we belong and starting fresh!")
janeb2 = jane.blogs.create(title: "It's Been Tough", content: "It takes me awhile to really get settled in but as soon as things started feeling normal again, we had to start fresh again. All these unexpected transitions are holding me back in ways I can't understand.")
janeb3 = jane.blogs.create(title: "Must Pull Through", content: "I have no other choice by to continue pulling through. I've spent too much time and money already. There is no other option but to keep going.")
jimmyb1 = jimmy.blogs.create(title: "Starting Over Again", content: "It really sucks when you've put everything you got into an endeavor just for it to all fall apart. Onto the next because there's no other options.")
jimmyb2 = jimmy.blogs.create(title: "Got to Stay Focus", content: "It's hard to keep my mind focused but I have to. I have a family to take care of.")

#COMMENTS
jane.comments.create(blog: jimmyb1, content: "It's okay to start over. So long as you never quit!")
jane.comments.create(blog: jimmyb2, content: "Focus, focus, and focus!")
jimmy.comments.create(blog: janeb1, content: "At least we are back to where we want!")
jimmy.comments.create(blog: janeb2, content: "We've made it this far already. Things can only look up from this point on!")