variable "aws_region" {
  default = "eu-central-1"
}
variable "aws_access_key_id" {}
variable "aws_secret_access_key" {}

variable "aws_zones" {
  type        = "list"
  description = "List of availability zones in use"
  default     = ["eu-central-1", "eu-west-2"]
}

