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
  resolvedDate: String
}, { _id: false });

const complianceSchema = new mongoose.Schema({
  inputBy: String,
  verdictBy: String,
  reinstatedBy: String,
  handler: String,
  suspensionStartDate: String,
  suspensionEndDate: String
}, { _id: false });

const caseSchema = new mongoose.Schema({
  driverImage: String,
  name: { type: String, required: true },
  type: String,
  source: String,
  effectDate: String,
  driverId: { type: String, required: true },
  contact: String,
  email: String,
  tripId: String,
  violation: String,
  status: String,
  action: String,
  duration: String,
  remarks: String,
  customerService: customerServiceSchema,
  compliance: complianceSchema
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
