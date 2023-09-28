-- CreateTable
CREATE TABLE `bookings` (
    `id` VARCHAR(191) NOT NULL,
    `checkIn` DATETIME(3) NOT NULL,
    `checkOut` DATETIME(3) NOT NULL,
    `numNights` INTEGER NOT NULL,
    `numGuests` INTEGER NOT NULL,
    `cabinPrice` DECIMAL(65, 30) NOT NULL,
    `extraPrice` DECIMAL(65, 30) NOT NULL,
    `totalPrice` DECIMAL(65, 30) NOT NULL,
    `status` ENUM('Cancelled', 'CheckedIn', 'CheckedOut', 'Confirmed', 'UnConfirmed') NOT NULL DEFAULT 'UnConfirmed',
    `hasBreakfast` BOOLEAN NOT NULL,
    `isPaid` BOOLEAN NOT NULL,
    `observations` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `cabinId` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `bookings_userId_key`(`userId`),
    UNIQUE INDEX `bookings_cabinId_key`(`cabinId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cabins` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `maxCapacity` INTEGER NOT NULL,
    `regularPrice` DECIMAL(65, 30) NOT NULL,
    `discount` DECIMAL(65, 30) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` VARCHAR(191) NOT NULL,
    `minBookingLength` INTEGER NOT NULL,
    `maxBookingLength` INTEGER NOT NULL,
    `guestsPerBooking` INTEGER NOT NULL,
    `breakfastPrice` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nationality` VARCHAR(255) NULL,
    `countryFlag` VARCHAR(255) NULL,
    `nationalId` VARCHAR(255) NULL,
    `gender` ENUM('Female', 'Male') NOT NULL DEFAULT 'Male',
    `role` ENUM('Admin', 'Guest', 'Staff') NOT NULL DEFAULT 'Guest',
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_cabinId_fkey` FOREIGN KEY (`cabinId`) REFERENCES `cabins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
