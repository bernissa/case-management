const mongoose = require('mongoose');

const customerServiceSchema = new mongoose.Schema({
  userType: String,
  fleetType: String,
  transactionId: String,
  serviceType: String,
  typeOfIssue: String,
  incidentDate: String,
  startTime: String,
  endTime: String,
  ticketDate: String,
  resolvedBy: String,
  resolvedDate: String,
}, { _id: false });

const complianceSchema = new mongoose.Schema({
  inputBy: String,
  verdictBy: String,
  reinstatedBy: String,
  handler: String,
  suspensionStartDate: String,
  suspensionEndDate: String,
}, { _id: false });

const caseSchema = new mongoose.Schema({
  profile: String, // profile image URL
  name: { type: String, required: true },
  type: { type: String, enum: ['Ride-Hailing', 'Delivery', 'Accident'], required: true },
  source: String,
  effectDate: String, // "DD/MM/YYYY"
  userId: { type: String, required: true },
  contact: String,
  email: String,
  tripId: String,
  violation: String,
  status: { type: String, enum: ['Pending', 'Resolved', 'Closed'], default: 'Pending' },
  action: String,
  duration: String,
  remarks: String,
  customerService: customerServiceSchema,
  compliance: complianceSchema,
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
