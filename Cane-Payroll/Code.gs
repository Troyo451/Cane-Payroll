// ✅ 1. Serve the index.html file
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index'); // Make sure your HTML file is named index.html
}

// ✅ 2. Record a daily cut to the "DailyCuts" sheet
function recordDailyCut(dateOfCut, cutterId, tonsCut) {
  try { // Add a try-catch block for robust error handling
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("DailyCuts");
    if (!sheet) {
      // Throw an error that the frontend can catch
      throw new Error("Sheet 'DailyCuts' not found in CanePayrollData spreadsheet.");
    }

    const timestamp = new Date();
    sheet.appendRow([timestamp, dateOfCut, cutterId, tonsCut]);

    // *** IMPORTANT CHANGE HERE ***
    return { status: 'success', message: 'Daily cut successfully recorded on server.' };
  } catch (e) {
    // Return an error object to the frontend
    return { status: 'error', message: e.message || 'An unknown error occurred during recordDailyCut.' };
  }
}

// ✅ 3. Record a deduction to the "Deductions" sheet
function recordDeduction(dateOfDeduction, cutterId, deductionType, amount, reason) {
  try { // Add a try-catch block for robust error handling
    const sheet = SpreadsheetApp.getActiveSpreadpesheet().getSheetByName("Deductions");
    if (!sheet) {
      throw new Error("Sheet 'Deductions' not found in CanePayrollData spreadsheet.");
    }

    const timestamp = new Date();
    sheet.appendRow([timestamp, dateOfDeduction, cutterId, deductionType, amount, reason]);

    // *** IMPORTANT CHANGE HERE ***
    return { status: 'success', message: 'Deduction successfully recorded on server.' };
  } catch (e) {
    return { status: 'error', message: e.message || 'An unknown error occurred during recordDeduction.' };
  }
}

// ✅ 4. Get cutter names and IDs from the "CaneCutters" sheet
function getCutterNamesAndIDs() {
  try { // Add a try-catch block
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CaneCutters");
    if (!sheet) {
      throw new Error("Sheet 'CaneCutters' not found in CanePayrollData spreadsheet.");
    }

    const data = sheet.getDataRange().getValues(); // Get all rows

    // Check if sheet is empty or only has headers
    if (data.length <= 1) { // Only header row or completely empty
      return { status: 'success', data: [] }; // Return empty array if no cutters
    }
    
    const headers = data[0]; // First row is headers

    const cutterIdIndex = headers.indexOf("CutterID");
    const nameIndex = headers.indexOf("Name");
    const surnameIndex = headers.indexOf("Surname");

    if (cutterIdIndex === -1 || nameIndex === -1 || surnameIndex === -1) {
      throw new Error("Required columns 'CutterID', 'Name', or 'Surname' not found in CaneCutters sheet. Please ensure headers are correct.");
    }

    const result = [];

    // Start from the second row (index 1) to skip headers
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      // Ensure row has enough columns before accessing
      if (row.length > Math.max(cutterIdIndex, nameIndex, surnameIndex)) {
          const id = row[cutterIdIndex];
          const fullName = row[nameIndex] + ' ' + row[surnameIndex];
          // Only add if ID is not empty
          if (id) { 
              result.push({ id: id, name: fullName });
          }
      }
    }
    return { status: 'success', data: result }; // *** IMPORTANT CHANGE HERE ***
  } catch (e) {
    return { status: 'error', message: e.message || 'An unknown error occurred while getting cutter names.' };
  }
} 