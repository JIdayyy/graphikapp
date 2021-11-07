import Loader from "@components/Assets/Loader";
import ThemeCard from "@components/Cards/ThemeCard";
import { theme } from "@Fetcher/httpFetcher";
import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import DrawingCard from "@components/Cards/DrawingCard";
import { Drawing } from ".prisma/client";

export default function DrawingList(): ReactElement {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading, error } = useQuery<Drawing[]>(
        "getThemesDrawings",
        () => theme.getDrawings(id as string),
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
        >
            {data.map((drawing) => (
                <DrawingCard key={drawing.id} drawing={drawing} />
            ))}
        </Box>
    );
}