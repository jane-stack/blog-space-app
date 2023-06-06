class Blog < ApplicationRecord
  belongs_to :author, class_name: "User", foreign_key: "user_id"
  has_many :comments, dependent: :destroy

  validates :title, presence: true, length: { in: 3..20 }
  validates :content, presence: true, length: { in: 3..500 }
end
