# Restaurant Application

## Project made by: Gerli Hirv, Taru Nipuli, Patrik Granström

[Linkki APIdociin](http://10.120.32.81/~tarunip/docs/index.html)


### Idea, Functionalities and Intended Audience

This application is website for a fine dining restaurant intended for customers
and restaurant staff.  
For customers the application allows for making a reservation at the restaurant, viewing current
menus and their included dishes, creating an account and viewing contact information
of the restaurant.  
For restaurant staff the application allows for altering the menu, including adding dishes to it,
changing the contents of the dishes and including or removing allergen warnings. Restaurant staff
is also able to keep track of the customer made reservations in a calendar view.

### For Testing

On the home page the user is able to leave a reservation. Reservation is made by filling in
a reservation name, reservation start date, reservation end date and the table the customer
would like to reserve.  
In the current version only table id 1 exists and no other submitted number will be counted as
a valid input into the database.  

On the menu page users can view the restaurant's current menus along with their details, such as name, description, dishes in the menu, prices, allergens and image. The menu of the day is highlighted to make it easier for users to identify. By clicking on a menu image, users can open a modal that displays additional details about the menu. The modal can be closed with pressing the X button or clicking outside the modal. In case the backend is unavailable, the application logs an error message in the console.  

Through the registration page, users can create their own profiles on the website by providing their full name, email address, phone number, and a password of their choice. All fields are required. The phone number, email, and password are validated before registration is successfully completed. By default, every registered user is assigned the role of a customer.  

After registering, users can log in by entering their email address and password. Upon successful login, they are redirected to their profile page, which displays their user information and registration date. The password is hidden for security. On the profile page, users can access settings to update or delete their profiles. They may choose which information to update by filling in the relevant input fields—completing all fields is not required.  

The admin role differs from the standard customer role. An admin account can only be created by hardcoding it into the database or by changing the default role in the backend during registration. Admins have access to a management page where they can update, delete, and add menus and dishes. The same applies to managing allergens—admins can add or delete allergens, and link or unlink them from dishes.  

The management page also includes a button that redirects the admin to the reservations page, where all reservations are displayed on a calendar.

### Running an example locally

To run the application locally on your computer:

1. Copy the restaurant-front repository to your chosen location on your computer
2. Navigate to the chosen location via terminal, PowerShell, command prompt or similiar
   means.
3. Install all necessary packages via command: npm i
4. Launch the application via command: npm run dev
5. Follow the url provided by Vite

### Project Feedback Form

[Leave Feedback!](https://docs.google.com/forms/d/e/1FAIpQLSc-TwLOgZ9pyWJg2W9m80UVJZmgRvoQTg-5IVJXjyXH_EG6ig/viewform?usp=dialog)
