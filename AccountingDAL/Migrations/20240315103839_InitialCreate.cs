using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccountingDAL.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Removed = table.Column<bool>(type: "bit", nullable: false),
                    RemovedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AccountBase",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(21)", maxLength: 21, nullable: false),
                    CategoryID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Removed = table.Column<bool>(type: "bit", nullable: false),
                    RemovedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountBase", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountBase_Categories_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Contractors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OperationType = table.Column<int>(type: "int", nullable: false),
                    Removed = table.Column<bool>(type: "bit", nullable: false),
                    RemovedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contractors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contractors_Categories_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlanSpendings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    CategoryID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Sum = table.Column<float>(type: "real", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlanID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanSpendings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlanSpendings_Categories_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlanSpendings_Plans_PlanID",
                        column: x => x.PlanID,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Balances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sum = table.Column<float>(type: "real", nullable: false),
                    AccountID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Balances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Balances_AccountBase_AccountID",
                        column: x => x.AccountID,
                        principalTable: "AccountBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CashOperations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    AccountID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OperationType = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sum = table.Column<float>(type: "real", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Index = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CashOperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CashOperations_AccountBase_AccountID",
                        column: x => x.AccountID,
                        principalTable: "AccountBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CorrectionOperations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    AccountID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OperationType = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sum = table.Column<float>(type: "real", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Index = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CorrectionOperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CorrectionOperations_AccountBase_AccountID",
                        column: x => x.AccountID,
                        principalTable: "AccountBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlanSavings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    AccountID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Sum = table.Column<float>(type: "real", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PlanID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanSavings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlanSavings_AccountBase_AccountID",
                        column: x => x.AccountID,
                        principalTable: "AccountBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlanSavings_Plans_PlanID",
                        column: x => x.PlanID,
                        principalTable: "Plans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TransferOperations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    CreditDepositAccountID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DebitDepositAccountID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreditCardID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DebitCardID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sum = table.Column<float>(type: "real", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Index = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransferOperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransferOperations_AccountBase_CreditCardID",
                        column: x => x.CreditCardID,
                        principalTable: "AccountBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TransferOperations_AccountBase_CreditDepositAccountID",
                        column: x => x.CreditDepositAccountID,
                        principalTable: "AccountBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TransferOperations_AccountBase_DebitCardID",
                        column: x => x.DebitCardID,
                        principalTable: "AccountBase",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TransferOperations_AccountBase_DebitDepositAccountID",
                        column: x => x.DebitDepositAccountID,
                        principalTable: "AccountBase",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ContractorOperations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", maxLength: 36, nullable: false),
                    AccountID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContractorID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OperationType = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sum = table.Column<float>(type: "real", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Index = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractorOperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContractorOperations_AccountBase_AccountID",
                        column: x => x.AccountID,
                        principalTable: "AccountBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContractorOperations_Categories_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ContractorOperations_Contractors_ContractorID",
                        column: x => x.ContractorID,
                        principalTable: "Contractors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountBase_CategoryID",
                table: "AccountBase",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Balances_AccountID",
                table: "Balances",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_CashOperations_AccountID",
                table: "CashOperations",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_ContractorOperations_AccountID",
                table: "ContractorOperations",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_ContractorOperations_CategoryID",
                table: "ContractorOperations",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_ContractorOperations_ContractorID",
                table: "ContractorOperations",
                column: "ContractorID");

            migrationBuilder.CreateIndex(
                name: "IX_Contractors_CategoryID",
                table: "Contractors",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_CorrectionOperations_AccountID",
                table: "CorrectionOperations",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_PlanSavings_AccountID",
                table: "PlanSavings",
                column: "AccountID");

            migrationBuilder.CreateIndex(
                name: "IX_PlanSavings_PlanID",
                table: "PlanSavings",
                column: "PlanID");

            migrationBuilder.CreateIndex(
                name: "IX_PlanSpendings_CategoryID",
                table: "PlanSpendings",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_PlanSpendings_PlanID",
                table: "PlanSpendings",
                column: "PlanID");

            migrationBuilder.CreateIndex(
                name: "IX_TransferOperations_CreditCardID",
                table: "TransferOperations",
                column: "CreditCardID");

            migrationBuilder.CreateIndex(
                name: "IX_TransferOperations_CreditDepositAccountID",
                table: "TransferOperations",
                column: "CreditDepositAccountID");

            migrationBuilder.CreateIndex(
                name: "IX_TransferOperations_DebitCardID",
                table: "TransferOperations",
                column: "DebitCardID");

            migrationBuilder.CreateIndex(
                name: "IX_TransferOperations_DebitDepositAccountID",
                table: "TransferOperations",
                column: "DebitDepositAccountID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Balances");

            migrationBuilder.DropTable(
                name: "CashOperations");

            migrationBuilder.DropTable(
                name: "ContractorOperations");

            migrationBuilder.DropTable(
                name: "CorrectionOperations");

            migrationBuilder.DropTable(
                name: "PlanSavings");

            migrationBuilder.DropTable(
                name: "PlanSpendings");

            migrationBuilder.DropTable(
                name: "TransferOperations");

            migrationBuilder.DropTable(
                name: "Contractors");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "AccountBase");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
