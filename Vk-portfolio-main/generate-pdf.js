import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

const doc = new jsPDF({
  unit: "pt",
  format: "a4",
});

const pageWidth = doc.internal.pageSize.getWidth(); // ~595 pt
const margin = 36; // 0.5 inch margins
const contentWidth = pageWidth - margin * 2; // ~523 pt

let y = 45;

function checkPage(need = 20) {
  if (y + need > 800) {
    doc.addPage();
    y = 40;
  }
}

// Title Header
doc.setFont("helvetica", "bold");
doc.setFontSize(22);
doc.text("VISHNU KUMAR M", margin, y);
y += 18;

doc.setFont("helvetica", "normal");
doc.setFontSize(9.5);
doc.text("Coimbatore, Tamil Nadu  |  8248605506  |  vishnu235kumar@gmail.com", margin, y);
y += 10;

// Top Divider Line
doc.setLineWidth(1);
doc.setDrawColor(30, 30, 30);
doc.line(margin, y, pageWidth - margin, y);
y += 18;

// SECTION HEADER HELPER
function addSectionHeader(title) {
  checkPage(30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(title, margin, y);
  y += 12;
}

// EXECUTIVE SUMMARY
addSectionHeader("EXECUTIVE SUMMARY");
doc.setFont("helvetica", "normal");
doc.setFontSize(9);

const summaryText =
  "MBA graduate specializing in HR & Marketing with 3+ years of hands-on operations and people-coordination experience. Experienced in employee training, shift and duty allocation, attendance and leave coordination, conflict resolution, and candidate interviewing. Skilled in SOP implementation, team coordination, franchise support, inventory management, vendor coordination, and quality control.\nSeeking an entry-level HR Executive/HR Trainee role to build practical HR expertise and develop into an HR Generalist.";

const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
doc.text(summaryLines, margin, y);
y += summaryLines.length * 11 + 8;

// Divider
doc.setLineWidth(0.5);
doc.setDrawColor(180, 180, 180);
doc.line(margin, y, pageWidth - margin, y);
y += 14;

// CORE SKILLS
addSectionHeader("CORE SKILLS");
doc.setFontSize(8.5);

const skillGroups = [
  {
    label: "HR & People Operations: ",
    val: "Employee Coordination | Employee Training | Shift & Duty Allocation | Attendance & Leave Coordination | Employee Conflict Resolution | Candidate Interviewing"
  },
  {
    label: "Operations: ",
    val: "SOP Development & Implementation | Team Coordination | Franchise/Client Coordination | Purchase Management | Inventory & Stock Management | Quality Control | Vendor Coordination"
  },
  {
    label: "Tools & Software: ",
    val: "MS Excel | Google Sheets | Google Drive | Gmail | Canva | AI Tools | POS/Billing Software"
  },
  {
    label: "Soft Skills: ",
    val: "Quick Learner | Adaptable | Willing to Learn | Calm Under Pressure | Organized | Responsible | Communication & Team Coordination"
  }
];

skillGroups.forEach(sg => {
  checkPage(20);
  doc.setFont("helvetica", "bold");
  doc.text(sg.label, margin, y);
  const labelWidth = doc.getTextWidth(sg.label);
  
  doc.setFont("helvetica", "normal");
  const valLines = doc.splitTextToSize(sg.val, contentWidth - labelWidth);
  
  if (valLines.length === 1) {
    doc.text(valLines[0], margin + labelWidth, y);
    y += 12;
  } else {
    doc.text(valLines[0], margin + labelWidth, y);
    y += 11;
    for (let i = 1; i < valLines.length; i++) {
      doc.text(valLines[i], margin, y);
      y += 11;
    }
    y += 2;
  }
});

y += 4;
doc.setLineWidth(0.5);
doc.setDrawColor(180, 180, 180);
doc.line(margin, y, pageWidth - margin, y);
y += 14;

// PROFESSIONAL EXPERIENCE
addSectionHeader("PROFESSIONAL EXPERIENCE");

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("Food Scientist — Operations & Administration", margin, y);
doc.text("April 2022 – December 2025", pageWidth - margin, y, { align: "right" });
y += 12;

doc.setFont("helvetica", "italic");
doc.setFontSize(9);
doc.text("Coimbatore, Tamil Nadu", margin, y);
y += 11;
doc.text("Role: Operations & Administration", margin, y);
y += 13;

doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);

const responsibilities = [
  "Coordinated day-to-day operations while managing and supporting a team of up to 8 employees.",
  "Trained new employees on work procedures, recipe preparation, quality standards, hygiene, stock handling, and opening/closing procedures.",
  "Allocated employee shifts and duties and coordinated attendance and leave requirements.",
  "Supported employee issue resolution and handled workplace conflicts when required.",
  "Participated in candidate interviews as needed for operational staffing requirements.",
  "Created and implemented SOPs covering kitchen procedures, food preparation, quality, hygiene, storage, and employee work processes.",
  "Supported franchise operations through operational guidance, recipe assistance, preparation support, and material-transfer coordination.",
  "Managed purchasing and maintained stock levels across 30+ items.",
  "Performed quality checks covering recipe accuracy, portion control, ingredient quality, hygiene, preparation processes, storage, and expiry dates.",
  "Maintained daily income and expense records using Google Sheets and coordinated vendor-related activities."
];

responsibilities.forEach(resp => {
  checkPage(16);
  doc.text("•", margin + 4, y);
  const respLines = doc.splitTextToSize(resp, contentWidth - 16);
  doc.text(respLines, margin + 16, y);
  y += respLines.length * 10.5 + 2;
});

y += 4;
checkPage(30);
doc.setFont("helvetica", "bold");
doc.setFontSize(9);
doc.text("Impact:", margin + 4, y);
y += 11;

doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
const impacts = [
  "Managed and supported a team of up to 8 employees.",
  "Supported 3 franchise outlets with operational guidance and coordination.",
  "Maintained inventory across 30+ items, supporting improved stock control and wastage management.",
  "Implemented SOPs across kitchen, quality, hygiene, storage, and employee work processes.",
  "Supported employee training, staffing coordination, attendance, leave, and workplace issue resolution."
];

impacts.forEach(imp => {
  checkPage(14);
  doc.text("•", margin + 12, y);
  const impLines = doc.splitTextToSize(imp, contentWidth - 24);
  doc.text(impLines, margin + 24, y);
  y += impLines.length * 10 + 2;
});

y += 6;
doc.setLineWidth(0.5);
doc.setDrawColor(180, 180, 180);
doc.line(margin, y, pageWidth - margin, y);
y += 14;

// EDUCATION
addSectionHeader("EDUCATION");

checkPage(24);
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.text("Master of Business Administration (MBA) — HR & Marketing", margin, y);
y += 11;
doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.text("RVS Institute of Management Studies  |  2021–2025  |  CGPA: 7.22 / 10", margin, y);
y += 15;

checkPage(24);
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.text("Bachelor of Commerce (B.Com)", margin, y);
y += 11;
doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.text("Kongunadu Arts and Science College, Bharathiar University  |  2018–2021  |  CGPA: 6.63 / 10", margin, y);

y += 14;
doc.setLineWidth(0.5);
doc.setDrawColor(180, 180, 180);
doc.line(margin, y, pageWidth - margin, y);
y += 14;

// LANGUAGES & AVAILABILITY
checkPage(40);
const col1X = margin;
const col2X = margin + 260;

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("LANGUAGES", col1X, y);
doc.text("AVAILABILITY", col2X, y);
y += 12;

doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.text("• Tamil — Fluent", col1X, y);
doc.text("• Immediate Joiner", col2X, y);
y += 11;
doc.text("• English — Good comprehension; developing spoken fluency", col1X, y);

const pdfBuffer = doc.output("arraybuffer");
fs.writeFileSync(path.join(process.cwd(), "public", "resume.pdf"), Buffer.from(pdfBuffer));
console.log("PDF generated successfully at public/resume.pdf");
