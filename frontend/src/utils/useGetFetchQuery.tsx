import { useQueryClient } from "react-query";

export const  handleQuery = {

      useGetFetchQuery : (name:string) => {
        const queryClient = useQueryClient();
    
        return queryClient.getQueryData(name);
    },
      InvalidataFetchQuery :(name:string) => {
        const queryClient = useQueryClient();
    
         queryClient.invalidateQueries(name);
    }
}