using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Customer
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int CustomerId { get; set; }

        public string? Email { get; set; }

        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        public string? Address { get; set; }

        [Required]
        public string? Postcode { get; set; }

        [Required]
        public string? City { get; set; }

        public ICollection<Order> Orders { get; } = new List<Order>();
    }
}