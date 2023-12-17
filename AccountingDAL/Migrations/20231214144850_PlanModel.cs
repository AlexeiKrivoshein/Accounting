using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccountingDAL.Migrations
{
    /// <inheritdoc />
    public partial class PlanModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transfers_Accounts_DebitAccountID",
                table: "Transfers");

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
                        name: "FK_PlanSavings_Accounts_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Accounts",
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

            migrationBuilder.AddForeignKey(
                name: "FK_Transfers_Accounts_DebitAccountID",
                table: "Transfers",
                column: "DebitAccountID",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transfers_Accounts_DebitAccountID",
                table: "Transfers");

            migrationBuilder.DropTable(
                name: "PlanSavings");

            migrationBuilder.DropTable(
                name: "PlanSpendings");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.AddForeignKey(
                name: "FK_Transfers_Accounts_DebitAccountID",
                table: "Transfers",
                column: "DebitAccountID",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
