import jsPDF from "jspdf";
import font from "../assets/fa-solid-900.ttf";
import styled from "styled-components";
import { LatoFontFaces } from "../css/Lato/LatoFontFaces";
import { DynaPuffFaces } from "../css/DynaPuff/DynaPuffFaces";

const A4_RATIO = 29.7 / 21; // A4 ratio (1.414)

const DownloadButton = () => {
  const handleDownloadPdf = async () => {
    const element = document.querySelector("#cv");

    if (!element) {
      console.error("Element not found: #cv");
      return;
    }

    // Create jsPDF instance with A4 page format
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
      putOnlyUsedFonts: true,
      compressPdf: true, // Enable PDF compression
    });

    // A4 page dimensions in points
    const pageWidth = 595.27; // A4 width -0.01
    const pageHeight = 841.89; // A4 height -0.01

    // Get element dimensions
    const elementWidth = element.offsetWidth;
    const elementHeight = elementWidth * A4_RATIO;

    // Calculate scaling to fit the element within A4 dimensions
    const scaleX = pageWidth / elementWidth;
    const scaleY = pageHeight / elementHeight;
    const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

    // Ensure adjusted height does not overflow the page
    const adjustedHeight = Math.min(elementHeight * scale, pageHeight);

    // Render HTML content into the PDF
    await pdf.html(element, {
      callback: (doc) => {
        const totalPages = doc.internal.pages.length;

        for (let i = 1; i < totalPages; i++) {
          doc.deletePage(2); // Delete all pages except the first
        }

        doc.save("resume.pdf"); // Save the PDF
      },
      x: 0,
      y: 0,
      html2canvas: {
        scale: scale, // Scale for accurate rendering
        useCORS: true, // Allow cross-origin resources
        scrollX: 0, // Prevent scrolling artifacts
        scrollY: 0,
        imageQuality: 0.5, // Compress images for smaller file size
      },
      width: pageWidth, // Match A4 width
      height: adjustedHeight, // Adjust content height to avoid overflow
      fontFaces: [
        {
          family: "FontAwesome", // Include the FontAwesome font
          style: "normal",
          weight: "900",
          src: [
            {
              url: font, // Use the imported font
              format: "truetype",
              subset: true, // Embed only the used subset of the font
            },
          ],
        },
        ...LatoFontFaces,
        ...DynaPuffFaces,
      ],
    });
  };

  return (
    <>
      <Button onClick={handleDownloadPdf}>
        <i className="fa-solid fa-download"></i> Download
      </Button>
    </>
  );
};

export default DownloadButton;

// Styled button
const Button = styled.button`
  background: rgb(237, 37, 83);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: rgb(220, 37, 83);
  }
`;
