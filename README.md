# E-Gallery

### Getting Started:
1. Make sure you have node.js installed on your system.
* If not then you can install it from here [node](https://nodejs.org/en/)

2. Clone the project repo on you system by either downloading the code or by using git clone
3. Run ```npm install``` in the terminal for both client and server directories it will install all the necessary dependencies in your system.
4. Run ```npm start``` and ```npm run start``` in client and server directories respectively.
5. You also need to create a ```.env``` file in it you have add following items :
> ACCESS_KEY
> 
> DATABASE_NAME
> 
> DATABASE_PASSWORD
> 
> CLOUDINARY_NAME
> 
> CLOUDINARY_KEY
> 
> CLOUDINARY_SECRET
> 
> RAZOR_PAY_ID
> 
> RAZOR_PAY_SECRET

<h2>Tech Stack used : MERN stack , bootstrap , cloudinary SDK , razorpay SDK</h2>

<h2>About This App</h2>
<li>It is having 3 types of users a normal user , seller and admin</li>
<li>A normal user is further divided into two categories premium and non-premium</li>
<li>A seller can list it's images here which users can see , rate , download and add to their favorite</li>
<li>There are two kind of images here premium and non premium</li>
<li>Normal user can view only non-premium images ,while a premium user can view all of the images</li>
<li>There is razorpay payment gateway integrated init so that a non-premium user can upgrade to a premium user</li>
<li>Admin can do anyting in this . It can create ,delete or edit any user , seller or image</li>
<li>Admin acts as a super user</li>


