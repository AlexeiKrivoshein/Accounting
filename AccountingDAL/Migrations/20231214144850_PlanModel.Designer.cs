﻿// <auto-generated />
using System;
using AccountingDAL.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AccountingDAL.Migrations
{
    [DbContext(typeof(AccountingContext))]
    [Migration("20231214144850_PlanModel")]
    partial class PlanModel
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AccountingDAL.Model.Account", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("AccountingDAL.Model.Balance", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<float>("Sum")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("AccountID");

                    b.ToTable("Balances");
                });

            modelBuilder.Entity("AccountingDAL.Model.Contractor", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CategoryID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OperationType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryID");

                    b.ToTable("Contractors");
                });

            modelBuilder.Entity("AccountingDAL.Model.Correction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Index")
                        .HasColumnType("int");

                    b.Property<int>("OperationType")
                        .HasColumnType("int");

                    b.Property<float>("Sum")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("AccountID");

                    b.ToTable("Corrections");
                });

            modelBuilder.Entity("AccountingDAL.Model.Operation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CategoryID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ContractorID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Index")
                        .HasColumnType("int");

                    b.Property<int>("OperationType")
                        .HasColumnType("int");

                    b.Property<float>("Sum")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("AccountID");

                    b.HasIndex("CategoryID");

                    b.HasIndex("ContractorID");

                    b.ToTable("Operations");
                });

            modelBuilder.Entity("AccountingDAL.Model.Plan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Plans");
                });

            modelBuilder.Entity("AccountingDAL.Model.PlanSaving", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AccountID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PlanID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Sum")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("AccountID");

                    b.HasIndex("PlanID");

                    b.ToTable("PlanSavings");
                });

            modelBuilder.Entity("AccountingDAL.Model.PlanSpending", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CategoryID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PlanID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<float>("Sum")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("CategoryID");

                    b.HasIndex("PlanID");

                    b.ToTable("PlanSpendings");
                });

            modelBuilder.Entity("AccountingDAL.Model.Transfer", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CreditAccountID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("DebitAccountID")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Index")
                        .HasColumnType("int");

                    b.Property<float>("Sum")
                        .HasColumnType("real");

                    b.HasKey("Id");

                    b.HasIndex("CreditAccountID");

                    b.HasIndex("DebitAccountID");

                    b.ToTable("Transfers");
                });

            modelBuilder.Entity("AccountingDAL.Model.Сategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(36)
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("AccountingDAL.Model.Balance", b =>
                {
                    b.HasOne("AccountingDAL.Model.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("AccountingDAL.Model.Contractor", b =>
                {
                    b.HasOne("AccountingDAL.Model.Сategory", "Category")
                        .WithMany("Сontractors")
                        .HasForeignKey("CategoryID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("AccountingDAL.Model.Correction", b =>
                {
                    b.HasOne("AccountingDAL.Model.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("AccountingDAL.Model.Operation", b =>
                {
                    b.HasOne("AccountingDAL.Model.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AccountingDAL.Model.Сategory", "Category")
                        .WithMany("Operations")
                        .HasForeignKey("CategoryID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("AccountingDAL.Model.Contractor", "Contractor")
                        .WithMany()
                        .HasForeignKey("ContractorID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Category");

                    b.Navigation("Contractor");
                });

            modelBuilder.Entity("AccountingDAL.Model.PlanSaving", b =>
                {
                    b.HasOne("AccountingDAL.Model.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AccountingDAL.Model.Plan", "Plan")
                        .WithMany("Savings")
                        .HasForeignKey("PlanID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Plan");
                });

            modelBuilder.Entity("AccountingDAL.Model.PlanSpending", b =>
                {
                    b.HasOne("AccountingDAL.Model.Сategory", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AccountingDAL.Model.Plan", "Plan")
                        .WithMany("Spendings")
                        .HasForeignKey("PlanID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Plan");
                });

            modelBuilder.Entity("AccountingDAL.Model.Transfer", b =>
                {
                    b.HasOne("AccountingDAL.Model.Account", "CreditAccount")
                        .WithMany("CreditTransfers")
                        .HasForeignKey("CreditAccountID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("AccountingDAL.Model.Account", "DebitAccount")
                        .WithMany("DeditTransfers")
                        .HasForeignKey("DebitAccountID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreditAccount");

                    b.Navigation("DebitAccount");
                });

            modelBuilder.Entity("AccountingDAL.Model.Account", b =>
                {
                    b.Navigation("CreditTransfers");

                    b.Navigation("DeditTransfers");
                });

            modelBuilder.Entity("AccountingDAL.Model.Plan", b =>
                {
                    b.Navigation("Savings");

                    b.Navigation("Spendings");
                });

            modelBuilder.Entity("AccountingDAL.Model.Сategory", b =>
                {
                    b.Navigation("Operations");

                    b.Navigation("Сontractors");
                });
#pragma warning restore 612, 618
        }
    }
}
