# Routes :
base url:	 https://login-user-221.herokuapp.com

 - /regester	

> takes firstName, lastName, phoneNumber, emailId, password, createdOn, lastUpdatedOn in body as json.
> **emailId** and **password** are required.

 - /login	

> takes email and password in body and return jwt token

 - /update

> takes the **JWT** token in header as authorization (bearer token)
> takes image as form data **photo**
> max 1.5mb and accepts only jpeg, jpg and png

 - /all
 > shows all users

	 

