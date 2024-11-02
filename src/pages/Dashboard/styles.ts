import styled from 'styled-components'

export const ContainerDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
    width: 100%;
    height: 100vh;

    .wrapper-container-header {
        width: 100%;
        height: 120px;
    }
    
    .wrapper-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: calc(100vh - 230px);
        overflow: auto;
    }

 
    
    .footer{
        height: 110px;
        width: 100%;
    }
`
