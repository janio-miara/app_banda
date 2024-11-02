import styled from 'styled-components'

export const Container= styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    border-radius: 8px;
    height: 130px;
    background: #75b4e642;
    padding: 16px;
    margin: 16px 0;
`

export const ContainerHora = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const WrapperHora = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  p {
    opacity: 0.5;
  }
  span {
    font-size: 10px;
    opacity: 0.7;
  }
`
