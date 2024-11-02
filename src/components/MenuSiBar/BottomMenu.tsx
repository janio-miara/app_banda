import React, { useState } from 'react';
import { AiOutlineCalendar, AiOutlineUserAdd } from "react-icons/ai";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import { MdOutlineMenu } from "react-icons/md";
import { BsJournalPlus } from "react-icons/bs";
import {CircleBackground, CircleBackgroundShadow, Label, MenuContainer, MenuItemWrapper} from './styles';
import {useContractor} from "../../Providers/ContractorContext";
import ModalCreateUser from "../CreateUser";
import ModalCreateEvento from "../ModalCreateEvent";
import ModalCreateContractor from "../ModalListContract";
import {useAuth} from "../../Providers/AuthContext";

interface MenuItemProps {
          label: string;
          icon: React.ReactNode;
          isActive: boolean;
          isDisabled?: boolean;
          onClick: () => void;
}


// Componente para cada item do menu
const MenuItem: React.FC<MenuItemProps> = ({ label, icon, isActive, isDisabled, onClick }) => (
    <MenuItemWrapper isActive={isActive} isDisabled={isDisabled} onClick={!isDisabled ? onClick : undefined}>
              {icon}
              <Label isActive={isActive} isDisabled={isDisabled}>{label}</Label>
    </MenuItemWrapper>
);

// Componente principal do menu
const BottomMenu: React.FC = () => {
          const [activeIndex, setActiveIndex] = useState(2);
          const [showModalUser, setShowModalUser] = useState(false); // Define o item ativo inicial como "Agenda"
          const [showModalEvent, setShowModalEvent] = useState(false);
          const [showModalContractor, setShowModalContractor] = useState(false);
          const { isAdmin } = useAuth()


          const menuItems = [
                    { label: 'Usuários', icon: <AiOutlineUserAdd />, isDisabled: !isAdmin, action: () => setShowModalUser(!showModalUser) },
                    { label: 'Clientes', icon: <AddBusinessOutlinedIcon />, isDisabled: !isAdmin,  action: () => setShowModalContractor(!showModalContractor)},
                    { label: 'Agenda', icon: <AiOutlineCalendar />, isDisabled: false, action: () => console.log(true) },
                    { label: 'Agendar', icon: <BsJournalPlus />, isDisabled: !isAdmin , action: () => setShowModalEvent(!showModalEvent)},
                    { label: 'Menu', icon: <MdOutlineMenu />, isDisabled: true, action: () => setShowModalContractor(!showModalContractor) },
          ];

          const handleAction = (action: any, index: number) => {
                    action();
                    setActiveIndex(index)
          }

          return (
              <MenuContainer>
                        <CircleBackgroundShadow activeIndex={activeIndex} />

                        <CircleBackground activeIndex={activeIndex}>
                                  {menuItems[activeIndex].icon}
                        </CircleBackground>

                        {menuItems.map((item, index) => (
                            <MenuItem
                                key={item.label}
                                label={item.label}
                                icon={item.icon}
                                isActive={activeIndex === index}
                                isDisabled={item.isDisabled}
                                onClick={() => !item.isDisabled &&  handleAction(item.action, index)}
                            />
                        ))}
                        <ModalCreateContractor showModalContractor={showModalContractor} setShowModalContractor={setShowModalContractor}/>
                        <ModalCreateEvento showModalEvent={showModalEvent} setShowModalEvent={setShowModalEvent}/>
                        <ModalCreateUser showModalUser={showModalUser} setShowModalUser={setShowModalUser}/>
              </MenuContainer>
          );
};

export default BottomMenu;
