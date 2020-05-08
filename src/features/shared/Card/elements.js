import styled, { css } from 'styled-components';
import { getColor } from '../../../utils/colors';


export const CardTitle = styled.div`
  display: block;
  width: 100%;
  padding: 8px 0;
  font-size: 20px;
  line-height: 27px;
  color: ${props => getColor('accent', 100, props.theme)};
  box-sizing: border-box;
`;

export const CardInnerWrapper = styled.div`
  width: 100%;
  height: ${props => props.withTitle ? 'calc(100% - 52px)' : '100%'};
  position: relative;
  top: 0;
  left: 0;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.stretch ? '100%' : '480px'};
  height: ${props => props.stretch ? '100%' : 'auto'};
  padding: ${props => props.withTitle ? 8 : 16}px 24px 16px;
  box-shadow: 0 2px 12px ${props => getColor('shadow', 20, props.theme)};
  border: 1px solid ${props => getColor('shadow', 15, props.theme)};
  border-radius: 4px;
  box-sizing: border-box;
  border-bottom-right-radius: 12px;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: top 125ms ease-in-out, box-shadow 125ms ease-in-out;
  background: ${props => getColor('clear-white', 100, props.theme)};

  &:hover {
    top: -4px;
    box-shadow: 0 6px 10px ${props => getColor('shadow', 25, props.theme)};
  }

  ${props => props.withError && css`
    border: 1px solid ${props => getColor('wrong-dark', 100, props.theme)};
    ${CardTitle} { display: none };
  `}
`;

export const ReqErrorBlock = styled.div`
  font-size: 16px;
  line-height: 23px;
  color: ${props => getColor('wrong', 100, props.theme)};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
`;