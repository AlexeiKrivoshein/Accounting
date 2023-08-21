using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    public class AccountingContext : DbContext
    {
        public DbSet<Account> Accounts => Set<Account>();

        public DbSet<OperationGroup> OperationGroups => Set<OperationGroup>();

        public DbSet<OperationDescription> OperationDescriptions => Set<OperationDescription>();

        public DbSet<Operation> Operations => Set<Operation>();

        public AccountingContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=KRIVOSHEIN;Database=Accounting;User=sa;Password=sa;TrustServerCertificate=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Operation>()
                        .HasOne(m => m.OperationGroup)
                        .WithMany(t => t.Operations)
                        .HasForeignKey(m => m.OperationGroupID)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OperationDescription>()
                        .HasOne(m => m.DefaultOperationGroup)
                        .WithMany(t => t.OperationDescriptions)
                        .HasForeignKey(m => m.DefaultOperationGrouptID)
                        .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
