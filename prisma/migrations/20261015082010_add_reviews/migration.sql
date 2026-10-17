-- CreateTable
CREATE TABLE `Review` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `poiId` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `text` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Review_poiId_idx`(`poiId`),
    INDEX `Review_userId_idx`(`userId`),
    UNIQUE INDEX `Review_userId_poiId_key`(`userId`, `poiId`),
    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_poiId_fkey` FOREIGN KEY (`poiId`) REFERENCES `Poi`(`poiId`) ON DELETE CASCADE ON UPDATE CASCADE;
