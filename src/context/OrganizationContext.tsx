import { createContext } from "react";

interface OrganizationContextType {
  organization: string;
}

export const OrganizationContext = createContext<OrganizationContextType>({
  organization: 'ds',
});

import { ReactNode } from "react";

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
    return (
        <OrganizationContext.Provider value={{ organization: 'sdadsa' }}>
        {children}
        </OrganizationContext.Provider>
    );
}