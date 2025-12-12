import { createContext } from "react";

export interface CustomerOption {
    label: string;
    value: string;
    isNew?: boolean;
}

export const CustomerDropContext = createContext<CustomerOption[] | null>(null);
