using AccountingDAL.Model.Dictionaries;
using AccountingDAL.Model.Operations;
using AccountingDAL.Model.Plans;
using Microsoft.EntityFrameworkCore;

namespace AccountingDAL.Model
{
    public class AccountingContext : DbContext
    {
        public DbSet<Account> Accounts => Set<Account>();

        public DbSet<Category> Categories => Set<Category>();

        public DbSet<Contractor> Contractors => Set<Contractor>();

        public DbSet<ContractorOperation> ContractorOperations => Set<ContractorOperation>();

        public DbSet<TransferOperation> TransferOperations => Set<TransferOperation>();

        public DbSet<CorrectionOperation> CorrectionOperations => Set<CorrectionOperation>();

        public DbSet<CashOperation> CashOperations => Set<CashOperation>();

        public DbSet<Balance> Balances => Set<Balance>();

        public DbSet<Plan> Plans => Set<Plan>();

        public DbSet<PlanSpending> PlanSpendings => Set<PlanSpending>();

        public DbSet<PlanSaving> PlanSavings => Set<PlanSaving>();

        public AccountingContext()
        {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=AKRIVOSHEIN;Database=Accounting;User=sa;Password=sa;TrustServerCertificate=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ContractorOperation>()
                        .HasOne(m => m.Category)
                        .WithMany(t => t.Operations)
                        .HasForeignKey(m => m.CategoryID)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Contractor>()
                        .HasOne(m => m.Category)
                        .WithMany(t => t.Contractors)
                        .HasForeignKey(m => m.CategoryID)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TransferOperation>()
                        .HasOne(m => m.CreditAccount)
                        .WithMany(t => t.CreditTransfers)
                        .HasForeignKey(m => m.CreditAccountID)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TransferOperation>()
                        .HasOne(m => m.DebitAccount)
                        .WithMany(t => t.DeditTransfers)
                        .HasForeignKey(m => m.DebitAccountID);

            modelBuilder.Entity<PlanSaving>()
                        .HasOne(m => m.Plan)
                        .WithMany(t => t.Savings)
                        .HasForeignKey(m => m.PlanID)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PlanSpending>()
                        .HasOne(m => m.Plan)
                        .WithMany(t => t.Spendings)
                        .HasForeignKey(m => m.PlanID)
                        .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
