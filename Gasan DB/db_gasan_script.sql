use master

drop database db_gasan

create database db_gasan

use db_gasan

CREATE TABLE Municipality
(
	MunicipalityID int primary key identity(1,1),
	Name varchar(255) unique not null,
	CreatedAt datetime not null,
	UpdatedAt datetime not null,
	ImagePath text,
	Mission text not null,
	Vision text not null
)

CREATE TABLE Municipality_History
(
	MunicipalityHistoryID int primary key identity(1,1),
	MunicipalityID int not null,
	[Year] varchar not null,
	[Description] text,
	CreatedAt datetime not null, 
	UpdatedAt datetime not null,
	ImagePath text
)

ALTER TABLE Municipality_History 
ADD CONSTRAINT fk_municipality_hist_municipality
	FOREIGN KEY (MunicipalityID) 
	REFERENCES Municipality(MunicipalityID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION

CREATE TABLE [Event]
(
	EventID int primary key identity(1,1),
	MunicipalityID int not null,
	Title varchar(255) unique not null,
	[Description] text,
	StartDate datetime not null,
	EndDate datetime not null,
	CreatedAt datetime not null,
	UpdatedAt datetime not null,
	IsLapsed smallint not null default(0)
)

ALTER TABLE [Event] 
ADD CONSTRAINT fk_event_municipality
	FOREIGN KEY (MunicipalityID) 
	REFERENCES Municipality(MunicipalityID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION

CREATE TABLE Announcement
(
	AnnouncementID int primary key identity(1,1),
	MunicipalityID int not null,
	Title varchar(255) unique not null,
	[Description] text,
	Duration decimal(4,2) not null,
	CreatedAt datetime not null,
	UpdatedAt datetime not null,
	IsLapsed smallint not null default(0)
)

ALTER TABLE Announcement 
ADD CONSTRAINT fk_announcement_municipality
	FOREIGN KEY (MunicipalityID) 
	REFERENCES Municipality(MunicipalityID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION

CREATE TABLE [Admin]
(
	AdminID int primary key identity(1,1),
	MunicipalityID int not null,
	FirstName varchar(255) not null,
	MiddleName varchar(255),
	LastName varchar(255) not null,
	CreatedAt datetime not null,
	UpdateddAt datetime not null,
	DeletedAt datetime
)

ALTER TABLE [Admin] 
ADD CONSTRAINT fk_admin_municipality
	FOREIGN KEY (MunicipalityID) 
	REFERENCES Municipality(MunicipalityID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION

CREATE TABLE Position
(
	PositionID int primary key identity(1,1),
	Title varchar(255) unique not null,
	CreatedAt datetime not null,
	UpdatedAt datetime not null,
	DeletedAt datetime
)

CREATE TABLE Officials
(
	OfficialsID int primary key identity(1,1),
	MunicipalityID int not null,
	PositionID int not null,
	FirstName varchar(255) not null,
	MiddleName varchar(255),
	LastName varchar(255) not null,
	OfficeStart datetime not null,
	OfficeEnd datetime not null,
	Title varchar(255) unique not null,
	CreatedAt datetime not null,
	UpdatedAt datetime not null,
	DeletedAt datetime
)

ALTER TABLE Officials 
ADD CONSTRAINT fk_officials_municipality
	FOREIGN KEY (MunicipalityID) 
	REFERENCES Municipality(MunicipalityID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION,
	CONSTRAINT fk_officials_position
	FOREIGN KEY (PositionID)
	REFERENCES Position(PositionID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION



CREATE TABLE [User]
(
	UserID int primary key identity(1,1),
	Username varchar(255) unique not null,
	FirstName varchar(255) not null,
	MiddleName varchar(255),
	LastName varchar(255) not null,
	Email varchar(255) unique not null,
	CreatedAt datetime not null
)

CREATE TABLE User_Officials_Rating
(
	UserID int not null,
	OfficialsID int not null,
	Rating int,
	RatedAt datetime not null
)

ALTER TABLE User_Officials_Rating
ADD CONSTRAINT fk_user_off_rating_officials
	FOREIGN KEY (OfficialsID) 
	REFERENCES Officials(OfficialsID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION,
	CONSTRAINT fk_user_off_rating_users
	FOREIGN KEY (UserID) 
	REFERENCES [User](UserID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION

CREATE TABLE User_Event_Subscription
(
	UserID int not null,
	EventID int not null,
	SubscribedAt datetime not null
)

ALTER TABLE User_Event_Subscription
ADD CONSTRAINT fk_user_event_sub_officials
	FOREIGN KEY (UserID) 
	REFERENCES [User](UserID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION,
	CONSTRAINT fk_user_event_sub_event
	FOREIGN KEY (EventID) 
	REFERENCES [Event](EventID)
	ON UPDATE CASCADE
	ON DELETE NO ACTION