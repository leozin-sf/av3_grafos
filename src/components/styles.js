import styled from "styled-components";

export const GraphCanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const FinishButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  background-color: greenyellow;
  border-radius: 10px;
  width: 10%;
  height: 5%;
  cursor: pointer;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  border: none;
`;

export const MaxFlowContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export const RestartButton = styled.button`
  margin-top: 10px;
  background-color: dodgerblue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`;
