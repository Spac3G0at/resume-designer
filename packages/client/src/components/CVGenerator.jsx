import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Template1 from "../templates/SideColumn.jsx/Template1";
import { useCV } from "../CVContext";
import TemplateTopInfos from "../templates/TopInfos/TemplateTopInfos";
import "../css/generator.css";

const CVGenerator = () => {
  const {
    editable,
    settings: { font },
  } = useCV();

  const rootRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });

  useEffect(() => {
    function handleResize() {
      if (!rootRef.current) return;

      // Actual rendered width of <Root>, including its padding
      const rootWidth = rootRef.current.offsetWidth;
      // Screen (viewport) width
      const screenWidth = document.documentElement.clientWidth;

      let newScale = 1;

      if (screenWidth > 962) {
        setScale(1);
        setMargins({ marginLeft: 0, marginRight: 0 });
        return;
      }

      if (rootWidth > screenWidth) {
        // Scale so <Root> fits exactly the viewport width
        newScale = screenWidth / rootWidth;
      }

      const calculatedMargins = screenWidth - rootWidth;

      const newMargins = {
        marginLeft: calculatedMargins,
        marginRight: calculatedMargins,
      };
      setMargins(newMargins);
      setScale(newScale);
    }

    window.addEventListener("resize", handleResize);
    // Run once on component mount
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Root ref={rootRef} $scale={scale} $margins={margins} id="cv-ctn">
      <PDFContainer $editable={editable} $font={font} id="cv">
        <Template />
      </PDFContainer>
    </Root>
  );
};

export default CVGenerator;

const Root = styled.div`
  display: block;
  padding: 20px;
  box-sizing: border-box;
  transform: scale(${(props) => props.$scale});
  transform-origin: top center;

  margin-left: ${(props) => props.$margins.marginLeft}px;
  margin-right: ${(props) => props.$margins.marginRight}px;
`;

const PDFContainer = styled.div`
  user-select: ${({ $editable }) => ($editable ? "none" : "auto")};
  width: 21cm; /* A4 width */
  min-width: 21cm; /* keep the layout consistent */
  max-width: 21cm;
  height: 29.7cm; /* A4 height */
  overflow: hidden;
  background-color: white;
  margin: 0 auto;
  color: black;
  box-sizing: border-box;
  font-family: ${({ $font }) => $font}, sans-serif;
`;

const Template = () => {
  const {
    settings: { template },
  } = useCV();
  switch (template) {
    case "topinfos":
      return <TemplateTopInfos />;
    default:
      return <Template1 />;
  }
};
