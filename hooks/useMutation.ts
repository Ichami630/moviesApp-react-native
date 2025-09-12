import { useState } from "react";

const useMutation = <T,U>(mutationFn: (variables: U) => Promise<T>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<T | null>(null);

    const mutate = async (variables: U): Promise<T | undefined> => {
        setLoading(true);
        setError(null);
        try {
            const result = await mutationFn(variables);
            setData(result);
            return result
        } catch (error) {
            setError(error instanceof Error ? error: new Error("An unknown error occured"));
        }finally{
            setLoading(false)
        }
    }

    return {data, loading, error, mutate};

}

export default useMutation