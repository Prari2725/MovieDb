import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
`;

const SpinnerWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
`;

const Spinner = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid #e94560;
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #e94560 transparent transparent transparent;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    </LoaderContainer>
  );
};

export default Loader;