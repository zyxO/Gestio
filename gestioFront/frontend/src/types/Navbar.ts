import type { SetStateAction } from "react";

export interface NavBarProps {
    searchItem: string;
    handleSearchChange: React.ChangeEventHandler<HTMLInputElement>;
    handleShowModal: (type:SetStateAction<string | null>) => void;
    username: string;
    logoutSpinnerOn: () => void;
    logoutSpinnerOff: () => void;
}