import { api } from "@/api/axios";
import { useAdminStore } from "@/state/adminStore"
import { IAdminSummary } from "@/types/admin.type";
import { IApiResponse } from "@/types/api.type";
import { handleApiError } from "@/utils/api.utils";
import { toast } from "sonner";

export const useAdminApi = () =>{

    const { setSummary, setIsLoading ,summary} = useAdminStore();

    const fetchAdminSummary = async() =>{
        setIsLoading(true);
        
        try {
          const response =    await api.get<IApiResponse<IAdminSummary>>("/admin/summary")
          const result = response.data;
          
          if(result.success ) {
            setSummary(result.data);
        
          }
          return result;
        } catch (error) {
            const {message} = handleApiError(error);
            toast.error(message);
            return error
        }
    };

    // Return the functions and state you want to expose


    

}