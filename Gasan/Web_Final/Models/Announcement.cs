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
    
    public partial class Announcement
    {
        public int AnnouncementID { get; set; }
        public int MunicipalityID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Duration { get; set; }
        public System.DateTime CreatedAt { get; set; }
        public System.DateTime UpdatedAt { get; set; }
        public short IsLapsed { get; set; }
    
        public virtual Municipality Municipality { get; set; }
    }
}
