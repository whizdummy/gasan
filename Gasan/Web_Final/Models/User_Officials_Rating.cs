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
    
    public partial class User_Officials_Rating
    {
        public int UserID { get; set; }
        public int OfficialsID { get; set; }
        public Nullable<int> Rating { get; set; }
        public System.DateTime RatedAt { get; set; }
    
        public virtual Officials Officials { get; set; }
        public virtual User User { get; set; }
    }
}
