﻿using Microsoft.EntityFrameworkCore;
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

        public DbSet<Contractor> Contractors => Set<Contractor>();

        public DbSet<Operation> Operations => Set<Operation>();

        public DbSet<Transfer> Transfers=> Set<Transfer>();

        public DbSet<Correction> Corrections => Set<Correction>();

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
            optionsBuilder.UseSqlServer("Server=KRIVOSHEIN;Database=Accounting_dev;User=sa;Password=sa;TrustServerCertificate=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Operation>()
                        .HasOne(m => m.Category)
                        .WithMany(t => t.Operations)
                        .HasForeignKey(m => m.CategoryID)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Contractor>()
                        .HasOne(m => m.Category)
                        .WithMany(t => t.Сontractors)
                        .HasForeignKey(m => m.CategoryID)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Transfer>()
                        .HasOne(m => m.CreditAccount)
                        .WithMany(t => t.CreditTransfers)
                        .HasForeignKey(m => m.CreditAccountID)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Transfer>()
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
