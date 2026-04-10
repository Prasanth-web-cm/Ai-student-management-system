const SmsLog = require('../models/SmsLog');

const sendSMSToParent = async (studentId, studentName, parentPhone, riskLevel, reason) => {
  const message = `Alert: Your child ${studentName} is currently at ${riskLevel} academic risk. Reason: ${reason}. Please contact the college counsellor immediately.`;
  
  console.log(`[SMS ALERT] Sending SMS to ${parentPhone}...`);
  console.log(`Message: "${message}"`);
  
  try {
    // Persist to DB
    const log = new SmsLog({
      studentId,
      parentPhone,
      message,
      riskLevel,
      status: 'Sent'
    });
    await log.save();
    return { success: true, message: 'SMS Alert registered and log saved' };
  } catch (error) {
    console.error('[SMS ERROR] Failed to save SMS log:', error);
    return { success: false, error: 'Failed to record SMS alert' };
  }
};

module.exports = { sendSMSToParent };
