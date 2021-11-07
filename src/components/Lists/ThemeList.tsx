import Loader from "@components/Assets/Loader";
import ThemeCard from "@components/Cards/ThemeCard";
import { theme } from "@Fetcher/httpFetcher";
import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { Theme } from ".prisma/client";

export default function ThemeList(): ReactElement {
    const { data, isLoading, error } = useQuery<Theme[]>("getTheme", () =>
        theme.getAll(),
    );

    if (isLoading) return <Loader />;
    if (error) return <div>Error!</div>;
    if (!data || data.length === 0) return <div>No themes found</div>;

    return (
        <Box
            height="100%"
            width="100%"
            flexWrap="wrap"
            display="flex"
            flexDirection="row"
            justifyContent="start"
            alignContent="start"
        >
            {data.map((themeItem) => (
                <ThemeCard key={themeItem.id} theme={themeItem} />
            ))}
        </Box>
    );
}
