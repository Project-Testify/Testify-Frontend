import React, { createContext, useState, FC, ReactNode, useEffect } from 'react';

// Define the state interface
export interface NewExamState {
    examId: string | null;
    examName: string | null;
}

// Define the context type
export interface NewExamContextType {
    newExamState: NewExamState;
    setNewExamState: React.Dispatch<React.SetStateAction<NewExamState>>;
}

// Create the context with a default value of undefined
export const NewExamContext = createContext<NewExamContextType | undefined>(undefined);

// Define the provider component
const NewExamProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [newExamState, setNewExamState] = useState<NewExamState>({
        examId: null,
        examName: null,
    });

    useEffect(() => {
        console.log(newExamState);
    }, [newExamState]);

    return (
        <NewExamContext.Provider value={{ newExamState, setNewExamState }}>
            {children}
        </NewExamContext.Provider>
    );
};

export default NewExamProvider;
