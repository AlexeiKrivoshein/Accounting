using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccountingDAL.Migrations
{
    /// <inheritdoc />
    public partial class DictionaryRemoved : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Removed",
                table: "Contractors",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "RemovedDate",
                table: "Contractors",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "Removed",
                table: "Categories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "RemovedDate",
                table: "Categories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "Removed",
                table: "Accounts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "RemovedDate",
                table: "Accounts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Removed",
                table: "Contractors");

            migrationBuilder.DropColumn(
                name: "RemovedDate",
                table: "Contractors");

            migrationBuilder.DropColumn(
                name: "Removed",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "RemovedDate",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "Removed",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "RemovedDate",
                table: "Accounts");
        }
    }
}
