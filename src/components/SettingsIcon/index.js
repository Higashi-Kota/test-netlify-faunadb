import styled from '@emotion/styled';

const StyledSetting = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSettingIcon = styled.svg`
  fill: #b7b9bd;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const SettingIcon = (props) => {
  const className = props.className || '';
  return (
    <StyledSetting
      onClick={props.onClick}
      className={`setting-toggle-wrapper ${className}`}
    >
      <StyledSettingIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 125"
      >
        <use xlinkHref="#settings" className="settings-gear"></use>
      </StyledSettingIcon>
    </StyledSetting>
  );
};

export default SettingIcon;
