variable "aws_profile" {
  default = "hunny"   # change to "devopsLearning" to switch account
}

variable "aws_region" {
  default = "ap-south-1"
}

variable "instance_type" {
  default = "c7i.flex.large"
}

variable "key_name" {
  description = "your existing key pair name in AWS"
}