import {useMutation} from "@tanstack/react-query";
import apiClient from "../apiClient.js";


export const useLoginMutation = () =>
    useMutation({
        mutationFn: async ({ email, password }) =>
            (
                await apiClient.post(`api/users/signin`, {
                    email,
                    password,
                })
            ).data,
    });

export const useRegisterMutation = () =>
    useMutation({
        mutationFn: async ({ name, email,password }) =>
            (
                await apiClient.post(`api/users/signup`, {
                    name,
                    email,
                    password
                })
            ).data,
    });
