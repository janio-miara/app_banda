import styled from "styled-components";



export const MenuContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    z-index: 1;
`;

export const CircleBackgroundShadow = styled.div<{ activeIndex: number }>`
    position: absolute;
    top: -33px;
    left: ${({ activeIndex }) => `calc(${activeIndex * 20}% + 10%)`};
    transform: translateX(-50%);
    width: 65px;
    height: 65px;
    background-color: #121212;
    border-radius: 50%;
    transition: left 0.3s ease;
    z-index: 1;
`;

export const CircleBackground = styled.div<{ activeIndex: number }>`
    position: absolute;
    top: -30px;
    left: ${({ activeIndex }) => `calc(${activeIndex * 20}% + 10%)`};
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    background-color: #09504c;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: left 0.3s ease;
    z-index: 2;

    & > svg {
        font-size: 30px;
        color: white;
    }
`;

export const MenuItemWrapper = styled.div<{ isActive: boolean; isDisabled?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ isActive, isDisabled }) =>
    isDisabled ? '#ccc' : isActive ? '#000' : '#888'};
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
    position: relative;
    z-index: 3;

    & svg {
        margin-left: -10px;
        font-size: 24px;
        color: ${({ isActive, isDisabled }) =>
    isDisabled ? '#ccc' : isActive ? 'transparent' : '#888'};
        transition: color 0.3s ease;
    }
`;

export const Label = styled.span<{ isActive: boolean; isDisabled?: boolean }>`
    font-size: 12px;
    color: ${({ isActive, isDisabled }) =>
    isDisabled ? '#ccc' : isActive ? '#09504c' : '#888'};
    margin-left: -10px;
`;
