//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Web_Final.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class User_Event_Subscription
    {
        public int UserID { get; set; }
        public int EventID { get; set; }
        public System.DateTime SubscribedAt { get; set; }
    
        public virtual Event Event { get; set; }
        public virtual User User { get; set; }
    }
}