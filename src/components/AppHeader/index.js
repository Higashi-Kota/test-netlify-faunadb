import React from 'react';
import logo from '../../assets/logo.svg';

import styled from '@emotion/styled';

const StyledHeader = styled.header`
  background-color: #222;
  height: 105px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  color: white;
  padding-left: 70px;
  @media screen and (max-width: 768px) {
    padding-left: 20px;
    height: auto;
  }
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  @media screen and (max-width: 768px) {
    width: 50px;
  }
`;

const StyledLogoImage = styled.img`
  width: 100%;
  max-width: 100%;
  display: block;
`;

const StyledHeaderTitlte = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 50px;
  @media screen and (max-width: 768px) {
    padding-left: 30px;
  }
`;

const AppHeader = ({ style }) => {
  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledLogo>
          <StyledLogoImage src={logo} alt={'logo'} />
        </StyledLogo>
        <StyledHeaderTitlte>
          <h2>{'Netlify + Fauna DB'}</h2>
          <p>{'Using FaunaDB & Netlify functions'}</p>
        </StyledHeaderTitlte>
      </StyledHeaderContainer>
    </StyledHeader>
  );
};

export { AppHeader };
