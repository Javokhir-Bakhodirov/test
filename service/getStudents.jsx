import { useQuery } from "@tanstack/react-query";
import { instance } from "../src/hooks/instance";

export const GetStudents = () => {
    const token = localStorage.getItem("token");
    const { data = [] } = useQuery({
        queryKey: ["allStudents"],
        queryFn: () =>
            instance()
                .get("/api/v1/getschools/2", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(res => res.data),
    });
    return data;
};
