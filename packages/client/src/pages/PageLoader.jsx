import { useLayoutEffect } from "react";
import styled, { keyframes } from "styled-components";

const PageLoader = () => {
  useLayoutEffect(() => {
    // document.body.style.overflow = "hidden";

    return () => {
      // document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <SpinnerOverlay>
      <Spinner />
    </SpinnerOverlay>
  );
};

export default PageLoader;

// Styled-components
const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it overlays other elements */

  margin-left: 230px;
  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
