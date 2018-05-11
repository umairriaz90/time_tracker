<p align="center"><h2 align="center">Time Tracker</h2>
    <img  src="https://raw.githubusercontent.com/umairriaz90/time_tracker/master/images/Main.jpg"/>  
</p>

<br>
<br>
<br>

## How To Run
The project has 2 separated parts. Front-end, developed using React and the back-end, developed using Symfony. I have stored a database SQL file for mySql. You can find it on the database folder in the project. Follow below steps to run the project on your local machine:<br>
<ol>
   <li>Import the back-end/TimeTracker.sql to mySql.</li>
   <li>Run composer install to install back-end packages or dependencies</li>
   <li>Update the back-end/.env file to be able to connect your data base and run the back-end project using bin/console server:start command. NOTE:the back-end part have no interfaces.</li>
   <li>You have to update the front-end Apis destination domain now. Open the front-end/src/index.js and update the domain property of the App component.</li>
   <li>Run npm install in the front-end DIR from console</li>
   <li>Run the front-end project with npm start.</li>
</ol>
If every thing is correct, you can see the chronometer in the black window and shouldn’t prompt any connection errors.  
<br>

## How it works
<br>

### Openning the application
The application connects to the server to load the last unfinished tracked time from the serve whenever you open it.

<br>

### Count down running
By pressing Start item on the stage, the count down will start. it is going to store the counted down time to the server in an interval. the interval time out can set up by passing updateInterval props to the App component. currently it is only every 1000 milliseconds that should increase for the real usage.

<br>

### Save/Reset tracking time
User can edit, save or reset his count down timer and all will store on the main data base after pressing buttons.

<br>

### Loading history
It shows all the previous saved tasks with their start date and end date. There is also the option to search by name and date to filter through a long list of functions. Search by date also caters calender based pagination as it only shows the entries for the respective date.

<br>

### Adding a task manually
There is also an option to add a task manually without tracking on the main screen which is useful in cases where you forget to add a task using the tracker.

<br>

### Remarks:
<ul>
   <li>Time spent : 3 days (project research, gathering relevant resources, coding, testing, finishing up)</li>
   <li>I liked the React JS framework because it's very easy to setup and needs minimal code to integrate services with any type of backend API.</li>
   <li>I have used HTML5 "datetime-local" and "date" input type for date input but some sort of datepicker JS would be more appropriate as well.</li>
   <li>Currently first the user have to track time and then give task Name and description. May be it will be better to have a form by side to enter the changes as live as well.</li>
   <li>If I had more time I would add more liveliness to the application by adding the tracker directly to the task list and then the user could any time click on the task and make changes as well along the way.
   </li>
   <li>I am satisfied by the application task tracking and task history with search and pagination but user input and user experience could be more enhanced but that's another topic for now.
   </li>
</ul>