    type IUser = {
      name?: string;
      email: string;
      password: string;
    }
    declare module 'react-dom' {
        export function createRoot(
          container: Element | Document | DocumentFragment | null
        ): {
          render(element: React.ReactNode): void;
        };
      }