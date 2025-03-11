import { useContext } from "react";
import { loadingContext } from "../contexts/LoadingProvider";

export const useLoading = () => {
    const [isLoading,setIsLoading] = useContext(loadingContext);
    return () => setIsLoading(prev => !prev);
};