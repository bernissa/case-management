const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  fullName: String,
  type: String,
  source: String,
  userId: String,
  contact: String,
  email: String,
  caseId: String,
  tripId: String,
  violation: String,
  status: String,
  verdict: String,
  duration: String,
  remarks: String,
  driverImage: String,
  customerService: {
    source: String,
    userType: String,
    fleetType: String,
    transactionId: String,
    serviceType: String,
    issueType: String,
    incidentDate: String,
    startTime: String,
    endTime: String,
    resolvedDate: String
  },
  compliance: {
    inputBy: String,
    verdictBy: String,
    suspensionStartDate: String,
    reinstatedBy: String,
    staffHandlingCase: String,
    suspensionEndDate: String
  }
});

module.exports = mongoose.model('Case', caseSchema);
