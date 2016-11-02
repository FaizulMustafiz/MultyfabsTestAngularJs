using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Data;
using System.Diagnostics;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services.Protocols;
using MultyfabsTestAngularJs.Models;

namespace MultyfabsTestAngularJs
{
    /// <summary>
    /// Summary description for MultifabsWebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MultifabsWebService : System.Web.Services.WebService
    {
        string connectionString =
               ConfigurationManager.ConnectionStrings["MultifabsDBConnectionString"].ConnectionString;


        [WebMethod]
        public void GetAllMachines()
        {
            List<Machine> listMachines = new List<Machine>();
            SqlConnection connection = new SqlConnection(connectionString);
            string query = "SELECT * FROM Machine";
            SqlCommand command = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Machine machine = new Machine()
                {
                    MachineId = Convert.ToInt32(reader["MachineId"]),
                    MachineNumber = reader["MachineNumber"].ToString()
                };
                listMachines.Add(machine);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listMachines));
        }

        [WebMethod]
        public void GetAllEmployee()
        {
            List<Employee> listEmployees = new List<Employee>();
            SqlConnection connection = new SqlConnection(connectionString);
            string query = "SELECT * FROM Employee";
            SqlCommand command = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Employee employee = new Employee()
                {
                    EmployeeId = Convert.ToInt32(reader["EmployeeId"]),
                    EmployeeCode = reader["EmployeeCode"].ToString(),
                    EmployeeName = reader["EmployeeName"].ToString()
                };
                listEmployees.Add(employee);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listEmployees));
        }

        [WebMethod]
        public void GetAllSchedule()
        {
            List<Schedule> listSchedules = new List<Schedule>();
            SqlConnection connection = new SqlConnection(connectionString);
            string query = "SELECT * FROM Schedule";
            SqlCommand command = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Schedule schedule = new Schedule()
                {
                    ScheduleId = Convert.ToInt32(reader["ScheduleId"]),
                    ScheduleName = reader["ScheduleName"].ToString()
                };
                listSchedules.Add(schedule);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listSchedules));
        }

        [WebMethod]
        public void GetAllMachineOperators()
        {
            List<MachineOperator> listMachineOperators = new List<MachineOperator>();
            SqlConnection connection = new SqlConnection(connectionString);
            string query = "SELECT * FROM MachineOperator";
            SqlCommand command = new SqlCommand(query, connection);
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                MachineOperator machineOperator = new MachineOperator()
                {
                    MachineOperatorId = Convert.ToInt32(reader["MachineOperatorId"]),
                    EmployeeCode = reader["EmployeeCode"].ToString(),
                    EmployeeName = reader["EmployeeName"].ToString(),
                    EffectDate = Convert.ToDateTime(reader["EffectDate"]),
                    Schedule = reader["Schedule"].ToString(),
                    MachineNumber = reader["MachineNumber"].ToString()
                };
                listMachineOperators.Add(machineOperator);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listMachineOperators));
        }

        [WebMethod]
        public void SaveMachineOperator(MachineOperator machineOperator)
        {
            SqlConnection connection = new SqlConnection(connectionString);
            string query = "spInsertMachineOperator";
            SqlCommand command = new SqlCommand(query, connection) {CommandType = CommandType.StoredProcedure};
            command.Parameters.Add(new SqlParameter()
            {
                ParameterName = "@EmployeeCode",
                Value = machineOperator.EmployeeCode
            });
            command.Parameters.Add(new SqlParameter()
            {
                ParameterName = "@EmployeeName",
                Value = machineOperator.EmployeeName
            });
            command.Parameters.Add(new SqlParameter()
            {
                ParameterName = "@EffectDate",
                Value = machineOperator.EffectDate
            });
            command.Parameters.Add(new SqlParameter()
            {
                ParameterName = "@Schedule",
                Value = machineOperator.Schedule
            });
            command.Parameters.Add(new SqlParameter()
            {
                ParameterName = "@MachineNumber",
                Value = machineOperator.MachineNumber
            });
            connection.Open();
            command.ExecuteNonQuery();
        }


        [WebMethod]
        public void IsMachineAssigned(string machineNumber, string employeeCode)
        {
            bool machineAssigned = false;

            SqlConnection connection = new SqlConnection(connectionString);
            string query = "spIsMachineAssigned";
            SqlCommand command = new SqlCommand(query, connection) { CommandType = CommandType.StoredProcedure };
            command.Parameters.Add(new SqlParameter()
            {
                ParameterName = "@MachineNumber",
                Value = machineNumber
            });
            command.Parameters.Add(new SqlParameter()
            {
                ParameterName = "@EmployeeCode",
                Value = employeeCode
            });
            connection.Open();
            machineAssigned = Convert.ToBoolean(command.ExecuteScalar());

            MachineOperator machineOperator = new MachineOperator();
            machineOperator.MachineNumber = machineNumber;
            machineOperator.EmployeeCode = employeeCode;
            machineOperator.MachineAssigned = machineAssigned;

            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(machineOperator));
        }

    }
}
