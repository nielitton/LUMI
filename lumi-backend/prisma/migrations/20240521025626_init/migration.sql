-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "reference_month" TEXT NOT NULL,
    "electric_energy_kwh" TEXT NOT NULL,
    "electric_energy_value" TEXT NOT NULL,
    "scee_energy_kwh" TEXT NOT NULL,
    "scee_energy_value" TEXT NOT NULL,
    "compensed_energy_kwh" TEXT NOT NULL,
    "compensed_energy_value" TEXT NOT NULL,
    "public_contrib" TEXT NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);
