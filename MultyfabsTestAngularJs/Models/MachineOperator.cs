using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MultyfabsTestAngularJs.Models
{
    public class MachineOperator
    {
        public int MachineOperatorId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public DateTime EffectDate { get; set; }
        public string Schedule { get; set; }
        public string MachineNumber { get; set; }
        public bool MachineAssigned { get; set; }

    }
}