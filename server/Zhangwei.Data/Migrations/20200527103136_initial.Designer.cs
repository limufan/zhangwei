﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Zhangwei.Models.Context;

namespace Zhangwei.Data.Migrations
{
    [DbContext(typeof(ZhangweiContext))]
    [Migration("20200527103136_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4");

            modelBuilder.Entity("Zhangwei.Data.GongyingshangDataModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("gongyingshang");
                });

            modelBuilder.Entity("Zhangwei.Data.PeijianDataModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<float>("Danjia")
                        .HasColumnType("REAL");

                    b.Property<string>("Danwei")
                        .HasColumnType("TEXT");

                    b.Property<int>("Kucun")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Remark")
                        .HasColumnType("TEXT");

                    b.Property<string>("Tag")
                        .HasColumnType("TEXT");

                    b.Property<string>("Tuhao")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("peijian");
                });

            modelBuilder.Entity("Zhangwei.Data.PeijianKucunDataModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<float>("Danjia")
                        .HasColumnType("REAL");

                    b.Property<string>("Danwei")
                        .HasColumnType("TEXT");

                    b.Property<string>("Gongyingshang")
                        .HasColumnType("TEXT");

                    b.Property<float>("Heji")
                        .HasColumnType("REAL");

                    b.Property<int>("Kucun")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Leixing")
                        .HasColumnType("TEXT");

                    b.Property<int>("PeijianId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PeijianName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Remark")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("RukuTime")
                        .HasColumnType("TEXT");

                    b.Property<int>("Shuliang")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Tuhao")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("peijian_kucun");
                });

            modelBuilder.Entity("Zhangwei.Data.WeixiuDataModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CheliangName")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<float>("Danjia")
                        .HasColumnType("REAL");

                    b.Property<string>("Danwei")
                        .HasColumnType("TEXT");

                    b.Property<float>("Heji")
                        .HasColumnType("REAL");

                    b.Property<float>("Jine")
                        .HasColumnType("REAL");

                    b.Property<int>("Kucun")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PeijianId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("PeijianName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Remark")
                        .HasColumnType("TEXT");

                    b.Property<int>("Shuliang")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Tuhao")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("WeixiuTime")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("weixiu");
                });
#pragma warning restore 612, 618
        }
    }
}