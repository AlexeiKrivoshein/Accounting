using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccountingDAL.Model
{
    public class AccountingContext : DbContext
    {
        public DbSet<Account> Accounts => Set<Account>();

        public DbSet<Card> Cards => Set<Card>();

        public DbSet<OperationGroup> OperationGroups => Set<OperationGroup>();

        public DbSet<OperationDescription> OperationDescriptions => Set<OperationDescription>();

        public DbSet<Operation> Operations => Set<Operation>();

        public AccountingContext(DbContextOptions<AccountingContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=KRIVOSHEIN;Database=Accounting;User=sa;Password=sa;TrustServerCertificate=true");
        }
    }
}
