const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

// Child Schema
const childSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  admissionDate: { type: Date, required: true },
  status: { type: String, enum: ['Active', 'Adopted', 'Transferred'], default: 'Active' },
  guardianInfo: String,
  initialDiagnosis: String,
  currentHealthStatus: { type: String, enum: ['Good', 'Needs Attention', 'Critical'], default: 'Good' },
  allergies: [String],
  medications: [String],
  lastCheckup: Date,
  dietType: String,
  feedingSchedule: String,
  favoriteFoods: [String],
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

// Staff Schema
const staffSchema = new Schema({
  fullName: { type: String, required: true },
  role: { type: String, enum: ['Caregiver', 'Doctor', 'Volunteer', 'Manager'], required: true },
  phone: String,
  email: { type: String, required: true, unique: true },
  assignedChildren: [{ type: Types.ObjectId, ref: 'Child' }],
  joinedDate: { type: Date, default: Date.now }
});

// Meal Plan Schema
const mealPlanSchema = new Schema({
  childId: { type: Types.ObjectId, ref: 'Child', required: true },
  weekStartDate: { type: Date, required: true },
  meals: {
    monday: {
      breakfast: [String],
      lunch: [String],
      dinner: [String]
    },
    tuesday: {
      breakfast: [String],
      lunch: [String],
      dinner: [String]
    },
    wednesday: {
      breakfast: [String],
      lunch: [String],
      dinner: [String]
    },
    thursday: {
      breakfast: [String],
      lunch: [String],
      dinner: [String]
    },
    friday: {
      breakfast: [String],
      lunch: [String],
      dinner: [String]
    },
    saturday: {
      breakfast: [String],
      lunch: [String],
      dinner: [String]
    },
    sunday: {
      breakfast: [String],
      lunch: [String],
      dinner: [String]
    }
  },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

// Adoption Record Schema
const adoptionRecordSchema = new Schema({
  child: { type: Types.ObjectId, ref: 'Child', required: true },
  adoptedBy: String,
  adoptionDate: { type: Date, required: true },
  followUpDates: [Date],
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

// Visitor Log Schema
const visitorLogSchema = new Schema({
  visitorName: String,
  visitDate: { type: Date, default: Date.now },
  purpose: String,
  childVisited: { type: Types.ObjectId, ref: 'Child' },
  staffContact: { type: Types.ObjectId, ref: 'Staff' },
  notes: String
});

// Inventory Schema
const inventorySchema = new Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: String,
  lastUpdated: { type: Date, default: Date.now },
  notes: String
});

// Attendance Schema
const attendanceSchema = new Schema({
  child: { type: Types.ObjectId, ref: 'Child', required: true },
  date: { type: Date, required: true },
  present: { type: Boolean, required: true },
  notes: String
});

// Models
const Child = model('Child', childSchema);
const Staff = model('Staff', staffSchema);
const MealPlan = model('MealPlan', mealPlanSchema);
const AdoptionRecord = model('AdoptionRecord', adoptionRecordSchema);
const VisitorLog = model('VisitorLog', visitorLogSchema);
const Inventory = model('Inventory', inventorySchema);
const Attendance = model('Attendance', attendanceSchema);

module.exports = {
  Child,
  Staff,
  MealPlan,
  AdoptionRecord,
  VisitorLog,
  Inventory,
  Attendance
};
