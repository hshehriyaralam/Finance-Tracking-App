import React from 'react';
import styled from 'styled-components';

const InputRange = () => {
  return (
    <StyledWrapper>
      <input id="myRange" className="slider" defaultValue={50} max={100} min={0} type="range" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #4c00ff;
    background-image: linear-gradient(160deg, #4900f5 0%, #80D0C7 100%);
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #0093E9;
    background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
    cursor: pointer;
  }`;

export default InputRange;
