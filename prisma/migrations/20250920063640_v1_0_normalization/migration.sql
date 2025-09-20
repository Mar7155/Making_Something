-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('pending', 'completed', 'shipped', 'delivered', 'cancelled');

-- CreateEnum
CREATE TYPE "public"."ShipmentStatus" AS ENUM ('pending', 'in_transit', 'delivered', 'returned');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('card', 'paypal', 'cash', 'bank_transfer');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL,
    "clerkId" TEXT NOT NULL DEFAULT 'id-default-change',
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shipping_address" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "ext_num" TEXT NOT NULL,
    "int_num" TEXT,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Mexico',
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "shipping_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "stock" INTEGER NOT NULL,
    "preview_image_url" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shipment" (
    "id" UUID NOT NULL,
    "address_id" UUID,
    "shipment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivery_date" TIMESTAMP(3),
    "status" "public"."ShipmentStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "shipment_id" UUID,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2),
    "shipping" DECIMAL(10,2),
    "total" DECIMAL(10,2) NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_item" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 1.00,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2),

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_method" "public"."PaymentMethod" NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "shipping_address_user_id_idx" ON "public"."shipping_address"("user_id");

-- CreateIndex
CREATE INDEX "shipment_address_id_idx" ON "public"."shipment"("address_id");

-- CreateIndex
CREATE INDEX "order_user_id_idx" ON "public"."order"("user_id");

-- CreateIndex
CREATE INDEX "order_shipment_id_idx" ON "public"."order"("shipment_id");

-- CreateIndex
CREATE INDEX "order_item_order_id_idx" ON "public"."order_item"("order_id");

-- CreateIndex
CREATE INDEX "order_item_product_id_idx" ON "public"."order_item"("product_id");

-- CreateIndex
CREATE INDEX "payment_order_id_idx" ON "public"."payment"("order_id");

-- AddForeignKey
ALTER TABLE "public"."shipping_address" ADD CONSTRAINT "shipping_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shipment" ADD CONSTRAINT "shipment_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."shipping_address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order" ADD CONSTRAINT "order_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_item" ADD CONSTRAINT "order_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
