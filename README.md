# Restaurant Application


## Project made by: Gerli Hirv, Taru Nipuli, Patrik Granström

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
In the current version dates must be inputted YYYY-MM-DD HH:MM format. (e.g. 2025-12-24 09:00).
Incorrect date formats will count as valid input to the database, but not for the calendar
accessible to the admin.

On the menu page users can view the restaurant's current menus along with their details, such as name, description, dishes in the menu, prices, allergens and image. The menu of the day is highlighted to make it easier for users to identify. By clicking on a menu image, users can open a modal that displays additional details about the menu. The modal can be closed with pressing the X button or clicking outside the modal. In case the backend is unavailable, the application logs an error message in the console.

User accounts ...

Admin ...

### Running an example locally

To run the application locally on your computer:

1. Copy the restaurant-front repository to your chosen location on your computer
2. Navigate to the chosen location via terminal, PowerShell, command prompt or similiar
   means.
3. Launch the application via npm run dev
4. Follow the url provided by Vite
