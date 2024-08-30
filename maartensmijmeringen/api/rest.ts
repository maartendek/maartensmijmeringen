import { GetStaticProps } from "next";
import { BlogResponse } from "./types";

const base_url: string = process.env.NEXT_PUBLIC_MM_API_URL!;
const bearer: string = `Bearer ${process.env.NEXT_PUBLIC_MM_API_TOKEN}`;

export const getBlogs = async () => {
    const response = await fetch(`${base_url}/blogs?sort=published:desc&pagination[pageSize]=999`, { method: "GET",
        cache: 'no-store',
        credentials: 'include',
        headers: {
            'Authorization': bearer,
        } });

    const { data, meta, error }: BlogResponse = await response.json();

    const status = error?.status;

    if (status && (status < 200 || status >= 300)) {
        return {
            props: {
                blogs: [],
                meta: {},
            },
        };
    }

    return {
        props: {
            blogs: data,
            meta,
        },
    };
};
