terraform {
  backend "s3" {
    bucket  = "discmsgr-terraform-env"
    key     = "shared/terraform.tfstate"
    region  = "eu-west-2"
    encrypt = true
  }
}
