import React from 'react';
import styled from 'styled-components';

const Button = ({onclick, Name}) => {
  return (
    <StyledWrapper>
      <button className="animated-button"  onClick={onclick} >
        <span>{Name}</span>
        <span />
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: inline-block;
    padding: 8px 30px;
    border: none;
    font-size: 15px;
    background-color: inherit;
    border-radius: 100px;
    font-family: 'Lexend Deca', sans-serif
    font-weight: 600;
    color:rgb(58, 60, 62);
    box-shadow: 0 0 0 2px #ffffff20;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .animated-button span:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: #2196F3;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .animated-button span:first-child {
    position: relative;
    z-index: 1;
  }

  .animated-button:hover {
    box-shadow: 0 0 0 5px #2195f360;
    color: #ffffff;
  }

  .animated-button:active {
    scale: 0.95;
  }

  .animated-button:hover span:last-child {
    width: 150px;
    height: 150px;
    opacity: 1;
  }`;

export default Button;
