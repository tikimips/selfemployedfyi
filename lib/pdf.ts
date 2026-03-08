import { MortgageInputs, MortgageOutputs, formatCurrency, formatPercent } from "./mortgage";

type RGB = [number, number, number];

export async function generatePDFReport(
  inputs: MortgageInputs,
  outputs: MortgageOutputs,
  email: string
): Promise<void> {
  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // ── Colors ──
  const emerald: RGB = [16, 185, 129];
  const slate950: RGB = [2, 8, 23];
  // const slate900: RGB = [15, 23, 42]; // unused but kept for reference
  const slate700: RGB = [51, 65, 85];
  const slate400: RGB = [148, 163, 184];
  const white: RGB = [255, 255, 255];
  const red400: RGB = [239, 68, 68];

  function setFill(c: RGB) { doc.setFillColor(c[0], c[1], c[2]); }
  function setDraw(c: RGB) { doc.setDrawColor(c[0], c[1], c[2]); }
  function setTxt(c: RGB) { doc.setTextColor(c[0], c[1], c[2]); }

  // ── Background ──
  setFill(slate950);
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), "F");

  // ── Header bar ──
  setFill(emerald);
  doc.rect(0, 0, pageWidth, 18, "F");

  setTxt(slate950);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("SelfEmployedFYI", margin, 12);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Mortgage Readiness Report", pageWidth - margin, 12, { align: "right" });

  // ── Title ──
  let y = 32;
  setTxt(white);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Your Mortgage-Ready Income Analysis", margin, y);

  y += 7;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  setTxt(slate400);
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} · ${email}`,
    margin,
    y
  );

  // ── Divider ──
  y += 6;
  setDraw(slate700);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);

  // ── Income Summary ──
  y += 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setTxt(emerald);
  doc.text("INCOME SUMMARY", margin, y);

  y += 6;
  const col2 = pageWidth / 2 + 5;
  const col1Right = col2 - 10;

  function labelValue(
    label: string,
    value: string,
    xLabel: number,
    xValue: number,
    yPos: number,
    highlight = false
  ) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setTxt(slate400);
    doc.text(label, xLabel, yPos);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    setTxt(highlight ? emerald : white);
    doc.text(value, xValue, yPos, { align: "right" });
  }

  labelValue("Gross Revenue", formatCurrency(inputs.grossRevenue), margin, col1Right, y);
  labelValue("Target Home Price", formatCurrency(inputs.targetHomePrice), col2, pageWidth - margin, y);

  y += 7;
  labelValue("Business Deductions", formatCurrency(inputs.businessDeductions), margin, col1Right, y);
  labelValue(
    "Down Payment",
    `${inputs.downPaymentPct}% (${formatCurrency(outputs.downPaymentAmount)})`,
    col2,
    pageWidth - margin,
    y
  );

  y += 7;
  labelValue("Schedule C Net Income", formatCurrency(outputs.qualifyingIncome), margin, col1Right, y, true);
  labelValue("Loan Needed", formatCurrency(outputs.targetMortgageNeeded), col2, pageWidth - margin, y);

  y += 7;
  labelValue("Est. Annual Tax Bill", formatCurrency(outputs.estimatedTaxBill), margin, col1Right, y);
  labelValue(
    "Filing Status",
    inputs.filingStatus === "single" ? "Single" : "Married",
    col2,
    pageWidth - margin,
    y
  );

  // ── Divider ──
  y += 8;
  setDraw(slate700);
  doc.line(margin, y, pageWidth - margin, y);

  // ── Mortgage Qualification ──
  y += 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setTxt(emerald);
  doc.text("MORTGAGE QUALIFICATION", margin, y);

  y += 6;
  labelValue(
    "Max Monthly Payment (43% DTI)",
    formatCurrency(outputs.maxMonthlyPayment),
    margin,
    col1Right,
    y
  );
  labelValue("Loan-to-Value", formatPercent(outputs.loanToValue), col2, pageWidth - margin, y);

  y += 7;
  const canQualify = outputs.estimatedMaxMortgage >= outputs.targetMortgageNeeded;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setTxt(slate400);
  doc.text("Estimated Max Mortgage", margin, y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  setTxt(canQualify ? emerald : red400);
  doc.text(formatCurrency(outputs.estimatedMaxMortgage), col1Right, y, { align: "right" });

  if (outputs.deductionGap > 0) {
    labelValue("Credit Score", inputs.creditScoreRange, col2, pageWidth - margin, y);

    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setTxt(slate400);
    doc.text("Deduction Gap (to qualify conventionally)", margin, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    setTxt(red400);
    doc.text(formatCurrency(outputs.deductionGap), col1Right, y, { align: "right" });

    y += 7;
    labelValue("Est. Tax Increase if Gap Closed", formatCurrency(outputs.taxIncreaseIfReduced), margin, col1Right, y, false);
  } else {
    labelValue("Credit Score", inputs.creditScoreRange, col2, pageWidth - margin, y);
  }

  // ── Recommendation Box ──
  y += 12;
  const boxColor: RGB =
    outputs.recommendation === "conventional"
      ? [6, 78, 59]
      : outputs.recommendation === "non-qm"
      ? [30, 58, 138]
      : [92, 53, 13];

  setFill(boxColor);
  const recLines = doc.splitTextToSize(outputs.recommendationText, contentWidth - 20) as string[];
  const boxHeight = 12 + recLines.length * 5.5;
  doc.roundedRect(margin, y, contentWidth, boxHeight, 3, 3, "F");

  y += 8;
  const recLabel =
    outputs.recommendation === "conventional"
      ? "RECOMMENDATION: CONVENTIONAL MORTGAGE"
      : outputs.recommendation === "non-qm"
      ? "RECOMMENDATION: NON-QM BANK STATEMENT LOAN"
      : "RECOMMENDATION: EXPLORE BOTH OPTIONS";

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  setTxt(emerald);
  doc.text(recLabel, margin + 8, y);

  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setTxt(white);
  doc.text(recLines, margin + 8, y);

  y += recLines.length * 5.5 + 4;

  // ── Non-QM Note ──
  y += 4;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setTxt(emerald);
  doc.text("ABOUT NON-QM LOANS", margin, y);

  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setTxt(slate400);
  const nonQmLines = doc.splitTextToSize(outputs.nonQmNote, contentWidth) as string[];
  doc.text(nonQmLines, margin, y);
  y += nonQmLines.length * 5 + 4;

  // ── What to do next ──
  y += 2;
  setDraw(slate700);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setTxt(emerald);
  doc.text("NEXT STEPS", margin, y);

  y += 6;
  const steps = [
    "1. Get your last 2 years of tax returns (1040 + Schedule C).",
    "2. Pull 12-24 months of business bank statements.",
    "3. Contact a mortgage broker who specializes in self-employed borrowers.",
    "4. Ask specifically about Non-QM bank statement loans if your Schedule C income is low.",
    "5. Consider if paying more taxes this year to qualify for your home makes financial sense.",
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setTxt(white);
  for (const step of steps) {
    const stepLines = doc.splitTextToSize(step, contentWidth - 4) as string[];
    doc.text(stepLines, margin, y);
    y += stepLines.length * 5 + 2;
  }

  // ── Disclaimer ──
  y = doc.internal.pageSize.getHeight() - 18;
  setDraw(slate700);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  setTxt(slate700);
  const disclaimer =
    "This report is for educational purposes only and does not constitute financial or legal advice. Mortgage qualification depends on many factors including credit history, assets, and lender guidelines. Consult a licensed mortgage professional before making any decisions.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth) as string[];
  doc.text(disclaimerLines, margin, y);

  // ── Save ──
  doc.save(`selfemployedfyi-mortgage-report-${Date.now()}.pdf`);
}
