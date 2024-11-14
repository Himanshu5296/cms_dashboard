import React, { createContext, ReactNode, useContext, useState } from "react";

type Role = 'Writer' | 'Reviewer' | null;

interface RoleContextType {
    role: Role;
    login: (selectedRole: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export const RoleProvider:React.FC<{children: ReactNode}>=({children}) =>{
    const [role,setRole] = useState<Role>(null);
    const login = (selectedRole:Role) => setRole(selectedRole);

    return (
        <RoleContext.Provider value={{role,login}}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRole = (): RoleContextType => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
};