import jsPDF from "jspdf";
import type { Asset } from "../types/assetTypes";
import autoTable from "jspdf-autotable";

export const exportAssetsToPDF = (assets: Asset[]) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Asset Report", 14, 20);

  doc.setFontSize(12);
  doc.text(`Total Assets: ${assets.length}`, 14, 28);
  const tableData = assets.map((asset) => [
    asset.name || "-",
    asset.type || "-",
    asset.status || "-",
    asset.assignedTo || "-",
    new Date(asset.createdAt).toLocaleString(),
    new Date(asset.updatedAt).toLocaleString(),
  ]);

  autoTable(doc, {
    startY: 38,
    head: [["Name", "Type", "Status", "Assigned To", "Created", "Updated"]],
    body: tableData,

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
    },

    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },

    columnStyles: {
      0: { cellWidth: 26 },
      1: { cellWidth: 22 },
      2: { cellWidth: 25 },
      3: { cellWidth: 25 },
      4: { cellWidth: 40 },
      5: { cellWidth: 40 },
    },
  });
  doc.save("assets.pdf");
};
