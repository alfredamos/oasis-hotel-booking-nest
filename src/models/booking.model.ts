/* eslint-disable prettier/prettier */

import { Status } from "@prisma/client";

export class BookingModel {
  checkIn: Date;
  checkOut: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  status: Status;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: string;
  userId: string;
}
