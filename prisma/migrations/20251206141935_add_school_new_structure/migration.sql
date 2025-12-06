-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Schools" ADD VALUE 'SCHOOL_OF_ALLIED_HEALTH_AND_LIFE_SCIENCES';
ALTER TYPE "Schools" ADD VALUE 'SCHOOL_OF_NURSING_AND_MIDWIFERY';
ALTER TYPE "Schools" ADD VALUE 'SCHOOL_OF_LAW_AND_EDUCATION';
ALTER TYPE "Schools" ADD VALUE 'SCHOOL_OF_ARTS_AND_SOCIAL_SCIENCES';
ALTER TYPE "Schools" ADD VALUE 'SCHOOL_OF_ENGINEERING_AND_DESIGN';
ALTER TYPE "Schools" ADD VALUE 'SCHOOL_OF_COMPUTER_SCIENCE_AND_DIGITAL_TECHNOLOGIES';
ALTER TYPE "Schools" ADD VALUE 'SCHOOL_OF_ARCHITECTURE_AND_PLANNING';
ALTER TYPE "Schools" ADD VALUE 'SCHOOL_OF_CONSTRUCTION_PROPERTY_AND_SURVEYING';
