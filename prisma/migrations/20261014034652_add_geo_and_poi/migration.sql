-- CreateTable
CREATE TABLE `Geo` (
    `geoId` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NULL,
    `lng` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Geo_name_idx`(`name`),
    INDEX `Geo_type_idx`(`type`),
    UNIQUE INDEX `Geo_parentId_slug_key`(`parentId`, `slug`),
    PRIMARY KEY (`geoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Poi` (
    `poiId` INTEGER NOT NULL AUTO_INCREMENT,
    `geoId` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `price` DOUBLE NULL,
    `rating` DOUBLE NULL,
    `meta` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Poi_geoId_category_idx`(`geoId`, `category`),
    INDEX `Poi_name_idx`(`name`),
    UNIQUE INDEX `Poi_geoId_slug_key`(`geoId`, `slug`),
    PRIMARY KEY (`poiId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Geo` ADD CONSTRAINT `Geo_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Geo`(`geoId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Poi` ADD CONSTRAINT `Poi_geoId_fkey` FOREIGN KEY (`geoId`) REFERENCES `Geo`(`geoId`) ON DELETE CASCADE ON UPDATE CASCADE;
