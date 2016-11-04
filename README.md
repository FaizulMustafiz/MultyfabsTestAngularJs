# MultyfabsTestAngularJs
This is an AngularJS project. It’s a single module of an ERP. It is a single page application. 
In this project there are three tables  
  1. Machine List 
  2. Operator List 
  3. Operator Assigned Information 
There are search filter for both Machine List and Operator List tables. 
You can Search Machine Number by Machine Number and Operator by Operator Code.  
It also has a Form for New operator assign. In New Operator Assign there are five input fields and two buttons.  
  1. Machine Number 
  2. Employee Code 
  3. Employee Name 
  4. Schedule 
  5. Effective Form  
  6. Save and Cancel Button  
Machine Number, Employee Code and Name are read only and you have to select them from two tables Machine List and Operator List. 
These value are automatically loaded in these fields. 
Then you have to select a schedule and select an effective date and press save. 
There are several Server side validation. 
  1. You can assign a machine to Single Operator for single Schedule for Single Machine. 
  2. You can’t assign same schedule on a same machine twice. 
  3. You can’t assign same operator for same machine for different schedule. 
  4. It will check all these condition before saving the value to Database, 
     then it will refers the page and add New Assign info to the Operator Assigned Information Table. 
  5. On cancel button press it will empty the controllers and refresh the page. 
