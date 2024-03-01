    type IUser = {
      name?: string;
      _id?: string,
      email: string;
      password: string;
    }
    
    type incomeType = {
      name?: string, 
     description: string,
     category?: string,
     type?: string,
     date: string
     _id?: string,
     title: string,
     amount: number
   }
    declare module 'react-dom' {
        export function createRoot(
          container: Element | Document | DocumentFragment | null
        ): {
          render(element: React.ReactNode): void;
        };
      }