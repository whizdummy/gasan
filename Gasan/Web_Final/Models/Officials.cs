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
    
    public partial class Officials
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Officials()
        {
            this.User_Officials_Rating = new HashSet<User_Officials_Rating>();
        }
    
        public int OfficialsID { get; set; }
        public int MunicipalityID { get; set; }
        public int PositionID { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public System.DateTime OfficeStart { get; set; }
        public System.DateTime OfficeEnd { get; set; }
        public string Title { get; set; }
        public System.DateTime CreatedAt { get; set; }
        public System.DateTime UpdatedAt { get; set; }
        public Nullable<System.DateTime> DeletedAt { get; set; }
    
        public virtual Municipality Municipality { get; set; }
        public virtual Position Position { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User_Officials_Rating> User_Officials_Rating { get; set; }
    }
}