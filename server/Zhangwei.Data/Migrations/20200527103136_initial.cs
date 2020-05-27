using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Zhangwei.Data.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "gongyingshang",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gongyingshang", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "peijian",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Tuhao = table.Column<string>(nullable: true),
                    Danwei = table.Column<string>(nullable: true),
                    Kucun = table.Column<int>(nullable: false),
                    Danjia = table.Column<float>(nullable: false),
                    Remark = table.Column<string>(nullable: true),
                    Tag = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_peijian", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "peijian_kucun",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PeijianId = table.Column<int>(nullable: false),
                    PeijianName = table.Column<string>(nullable: true),
                    Tuhao = table.Column<string>(nullable: true),
                    Danwei = table.Column<string>(nullable: true),
                    Danjia = table.Column<float>(nullable: false),
                    RukuTime = table.Column<DateTime>(nullable: false),
                    CreatedTime = table.Column<DateTime>(nullable: false),
                    Shuliang = table.Column<int>(nullable: false),
                    Gongyingshang = table.Column<string>(nullable: true),
                    Kucun = table.Column<int>(nullable: false),
                    Heji = table.Column<float>(nullable: false),
                    Leixing = table.Column<string>(nullable: true),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_peijian_kucun", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "weixiu",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CheliangName = table.Column<string>(nullable: true),
                    PeijianId = table.Column<int>(nullable: false),
                    PeijianName = table.Column<string>(nullable: true),
                    Tuhao = table.Column<string>(nullable: true),
                    Danwei = table.Column<string>(nullable: true),
                    WeixiuTime = table.Column<DateTime>(nullable: false),
                    CreatedTime = table.Column<DateTime>(nullable: false),
                    Shuliang = table.Column<int>(nullable: false),
                    Kucun = table.Column<int>(nullable: false),
                    Danjia = table.Column<float>(nullable: false),
                    Jine = table.Column<float>(nullable: false),
                    Heji = table.Column<float>(nullable: false),
                    Remark = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_weixiu", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "gongyingshang");

            migrationBuilder.DropTable(
                name: "peijian");

            migrationBuilder.DropTable(
                name: "peijian_kucun");

            migrationBuilder.DropTable(
                name: "weixiu");
        }
    }
}
