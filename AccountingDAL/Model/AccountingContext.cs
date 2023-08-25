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

        public DbSet<Сategory> Categories => Set<Сategory>();

        public DbSet<Template> Templates => Set<Template>();

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
                        .HasOne(m => m.Category)
                        .WithMany(t => t.Operations)
                        .HasForeignKey(m => m.CategoryID)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Template>()
                        .HasOne(m => m.DefaultCategory)
                        .WithMany(t => t.Templates)
                        .HasForeignKey(m => m.DefaultCategoryID)
                        .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
