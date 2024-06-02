class ParkingSlot {
  constructor(slotId, slotType) {
    this.slotId = slotId;
    this.slotType = slotType; // '2-wheeler' or '4-wheeler'
    this.isOccupied = false;
    this.vehicle = null;
  }

  parkVehicle(vehicle) {
    this.isOccupied = true;
    this.vehicle = vehicle;
  }

  removeVehicle() {
    this.isOccupied = false;
    this.vehicle = null;
  }
}

class Vehicle {
  constructor(vehicleId, vehicleType) {
    this.vehicleId = vehicleId;
    this.vehicleType = vehicleType; // '2-wheeler' or '4-wheeler'
  }
}

class ParkingLot {
  constructor(num2WheelerSlots, num4WheelerSlots) {
    this.slots = [];
    this.vehicleSlotMap = {};

    for (let i = 0; i < num2WheelerSlots; i++) {
      this.slots.push(new ParkingSlot(`2W-${i + 1}`, "2-wheeler"));
    }
    for (let i = 0; i < num4WheelerSlots; i++) {
      this.slots.push(new ParkingSlot(`4W-${i + 1}`, "4-wheeler"));
    }
  }

  addVehicle(vehicle) {
    const availableSlot = this.slots.find(
      (slot) => !slot.isOccupied && slot.slotType === vehicle.vehicleType
    );

    if (availableSlot) {
      availableSlot.parkVehicle(vehicle);
      this.vehicleSlotMap[vehicle.vehicleId] = availableSlot;
      console.log(
        `Vehicle ${vehicle.vehicleId} parked in slot ${availableSlot.slotId}`
      );
      return true;
    } else {
      console.log(`No available slots for ${vehicle.vehicleType}`);
      return false;
    }
  }

  removeVehicle(vehicleId) {
    const slot = this.vehicleSlotMap[vehicleId];
    if (slot) {
      slot.removeVehicle();
      delete this.vehicleSlotMap[vehicleId];
      console.log(`Vehicle ${vehicleId} removed from slot ${slot.slotId}`);
      return true;
    } else {
      console.log(`Vehicle ${vehicleId} not found`);
      return false;
    }
  }

  findVehicle(vehicleId) {
    const slot = this.vehicleSlotMap[vehicleId];
    if (slot) {
      console.log(`Vehicle ${vehicleId} is parked in slot ${slot.slotId}`);
      return slot.slotId;
    } else {
      console.log(`Vehicle ${vehicleId} not found`);
      return null;
    }
  }

  getAvailableSlots() {
    const available2WheelerSlots = this.slots.filter(
      (slot) => !slot.isOccupied && slot.slotType === "2-wheeler"
    ).length;
    const available4WheelerSlots = this.slots.filter(
      (slot) => !slot.isOccupied && slot.slotType === "4-wheeler"
    ).length;
    console.log(
      `Available slots - 2-wheelers: ${available2WheelerSlots}, 4-wheelers: ${available4WheelerSlots}`
    );
    return {
      "2-wheeler": available2WheelerSlots,
      "4-wheeler": available4WheelerSlots,
    };
  }
}

// Example usage
const parkingLot = new ParkingLot(2, 2);
console.log(parkingLot.slots);
const vehicle1 = new Vehicle("V1", "2-wheeler");
const vehicle2 = new Vehicle("V2", "4-wheeler");
const vehicle3 = new Vehicle("V3", "2-wheeler");
const vehicle4 = new Vehicle("V4", "4-wheeler");

parkingLot.addVehicle(vehicle1); // Vehicle V1 parked in slot 2W-1
parkingLot.addVehicle(vehicle2); // Vehicle V2 parked in slot 4W-1
parkingLot.addVehicle(vehicle3); // Vehicle V3 parked in slot 2W-2
parkingLot.addVehicle(vehicle4); // Vehicle V4 parked in slot 4W-2

parkingLot.getAvailableSlots(); // Available slots - 2-wheelers: 0, 4-wheelers: 0

parkingLot.findVehicle("V2"); // Vehicle V2 is parked in slot 4W-1

parkingLot.removeVehicle("V1"); // Vehicle V1 removed from slot 2W-1
parkingLot.getAvailableSlots(); // Available slots - 2-wheelers: 1, 4-wheelers: 0
