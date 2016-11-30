# This is an AngularJS project. It’s a single module of an ERP. It is a single page application.

## **The Index Page**
![Home Page](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/MachineOperatorHomePage.PNG)

### In this project there are three tables 
    1.Machine List
![Machine List](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/MachineList.PNG)

    2.	Operator List
![Operator List](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/OperatorList.PNG)

    3.	Operator Assigned Information
![Assigned Information List](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/AssignedInformation.PNG)

### There are search filter for both Machine List and Operator List tables. You can Search Machine Number by Machine Number and Operator by Operator Code.
![Machine Search](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/machineSearch.PNG)      ![Operator Search](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/operatorSearch.PNG)

### It also has a Form for New operator assign. In New Operator Assign there are five input fields and two buttons. 

![New Assign Form](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/NewAssign.PNG)

### Machine Number, Employee Code and Name are read only and you have to select them from two tables Machine List and Operator List. These value are automatically loaded in these fields. Then you have to select a schedule and select an effective date and press save. There are several Server side validation.

     1.	You can assign a machine to Single Operator for single Schedule for Single Machine.
     2.	You can’t assign same schedule on a same machine twice.
![Validation Image](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/SameOperatorAssignCheck.PNG)

     3.	You can’t assign same operator for same machine for different schedule.
![Validation Image](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/Schedule%20Validation.PNG)


     4.	It will check all these condition before saving the value to Database, then it will refers the page 
         and add New Assign info to the Operator Assigned Information Table.
![Insert Image](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/Screenshot%20(247).png)
***
![New Data Added](https://github.com/FaizulMustafiz/MultyfabsTestAngularJs/blob/master/MultyfabsTestAngularJs/NewOperatorAssign.PNG)
     
     5.	On cancel button press it will empty the controllers and refresh the page.

# _Thank You_
