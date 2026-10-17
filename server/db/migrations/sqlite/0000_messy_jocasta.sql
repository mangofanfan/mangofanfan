CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`route` text NOT NULL,
	`parentId` integer,
	`content` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`link` text,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`parentId`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
