import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    //----> Destructure userId and cabinId from payload.
    const { cabinId, userId } = createBookingDto;

    //---> type of checkIn.
    const checkIn = createBookingDto.checkIn;
    if (typeof checkIn === 'string') {
      createBookingDto.checkIn = new Date(checkIn);
    }
    //---> type of checkOut.
    const checkOut = createBookingDto.checkOut;
    if (typeof checkOut === 'string') {
      createBookingDto.checkOut = new Date(checkOut);
    }

    //----> Check for the user who books the cabin.
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`The user with id = ${userId} is not found!`);
    }

    //----> Check for cabin to be booked.
    const cabin = await this.prisma.cabin.findUnique({
      where: { id: cabinId },
    });
    if (!cabin) {
      throw new NotFoundException(
        `The cabin with id = ${cabinId} is not found!`,
      );
    }

    const newBooking = await this.prisma.booking.create({
      data: { ...createBookingDto },
    });

    //----> Send back response.
    return newBooking;
  }

  async findAll() {
    const bookings = await this.prisma.booking.findMany({});

    //----> Check for existence of bookings.
    if (!bookings || !bookings.length) {
      throw new NotFoundException(
        'bookings are not available in the database!',
      );
    }

    //----> Send back the response.
    return bookings;
  }

  async findOne(id: string) {
    //----> Retrieve the booking with the given id.
    const booking = await this.prisma.booking.findUnique({ where: { id } });

    //----> Check for existence of booking.
    if (!booking) {
      throw new NotFoundException(`The booking with id = ${id} is not found!`);
    }

    //----> Send back the response.
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    //----> Destructure userId and cabinId from payload.
    const { cabinId, userId } = updateBookingDto;

    //---> type of checkIn.
    const checkIn = updateBookingDto.checkIn;
    if (typeof checkIn === 'string') {
      updateBookingDto.checkIn = new Date(checkIn);
    }
    //---> type of checkOut.
    const checkOut = updateBookingDto.checkOut;
    if (typeof checkOut === 'string') {
      updateBookingDto.checkOut = new Date(checkOut);
    }

    //----> Check for the user who books the cabin.
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`The user with id = ${userId} is not found!`);
    }

    //----> Check for cabin to be booked.
    const cabin = await this.prisma.cabin.findUnique({
      where: { id: cabinId },
    });
    if (!cabin) {
      throw new NotFoundException(
        `The cabin with id = ${cabinId} is not found!`,
      );
    }

    //----> Retrieve the booking with the given id.
    const booking = await this.prisma.booking.findUnique({ where: { id } });

    //----> Check for existence of booking.
    if (!booking) {
      throw new NotFoundException(`The booking with id = ${id} is not found!`);
    }

    //----> Update the booking data in the database.
    const updatedBooking = await this.prisma.booking.update({
      where: { id },
      data: { ...updateBookingDto },
    });

    //----> Send back the response.
    return updatedBooking;
  }

  async remove(id: string) {
    //----> Retrieve the booking with the given id.
    const booking = await this.prisma.booking.findUnique({ where: { id } });

    //----> Check for existence of booking.
    if (!booking) {
      throw new NotFoundException(`The booking with id = ${id} is not found!`);
    }

    //----> Delete the booking with the given id from database.
    const deletedBooking = await this.prisma.booking.delete({ where: { id } });

    //----> Send back the response.
    return deletedBooking;
  }
}
