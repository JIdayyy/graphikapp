/* eslint-disable react/no-children-prop */
/* eslint-disable no-console */
import React, { ChangeEvent, useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Box, Button } from "@chakra-ui/react";
import { UserContext } from "@Context/UserContext";
import ControlledInput from "@components/Inputs/ControlledInput";
import ControlledFileInput from "@components/Inputs/ControlledFileInput";
import UXMessageDisplay from "@components/Assets/UXMessageDisplay";
import ProgressPercentage from "@components/Assets/ProgressPercentage";
import ProgressBar from "@components/Assets/ProgressBar";
import ControlledSelect from "@components/Inputs/ControlledSelect";
import Loader from "@components/Assets/Loader";
import { BodyPicturePost, TTheme } from "../../..";
import axiosInstance from "../../fetcher/axiosInstance";
import ImagePreview from "../Image/ImagePreview";
import ControlledFormWrapper from "./ControlledFormWrapper";

export default function UploadImageForm(): JSX.Element {
    const { state } = useContext(UserContext);
    const [image, setImage] = useState<File | undefined>();
    const [imageResponse, setImageResponse] = useState<string>("");
    const [UXmessage, setUXMessage] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [themeList, setThemeList] = useState<TTheme[]>([]);

    const [postFormData, setPostFormData] = useState<BodyPicturePost>({
        author_id: "",
        drawing_name: "",
        theme_id: "",
    });

    const { data: ThemeRes, isLoading } = useQuery(
        "getThemes",
        () => axiosInstance.get("/themes").then((r) => r.data),
        {
            onSuccess: (data) => {
                setThemeList(data);
                setPostFormData({
                    author_id: "",
                    theme_id: data[0].id,
                    drawing_name: "",
                });
            },
        },
    );

    const { mutateAsync, isLoading: updating } = useMutation(
        (newImage: FormData) =>
            axiosInstance
                .post("/drawings/upload", newImage, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (p) => {
                        setProgress((p.loaded / p.total) * 100);
                    },
                })
                .then((r) => r.data)
                .catch((err) => {
                    setUXMessage(err.response.data.message);
                }),
        {
            onSuccess: (data) => {
                if (data !== undefined) {
                    setImageResponse(data.url);
                    setUXMessage("DESSIN ENVOYE AVEC SUCCES !");
                }
                setPostFormData({
                    drawing_name: "",
                    theme_id: ThemeRes[0].id,
                });
            },
            onError: (err) => {
                console.log("ERROR DURING UPLOAD", err);
            },
            useErrorBoundary: true,
        },
    );

    const removeImage = () => {
        setImage(undefined);
        setUXMessage("");
        setPostFormData({
            theme_id: ThemeRes[0].id,
            drawing_name: "",
        });
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPostFormData({
            ...postFormData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setPostFormData({
            ...postFormData,
            [e.target.name]: e.target.value,
        });
    };

    const fileUpload = async () => {
        setProgress(0);
        if (image && postFormData) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("author_id", state.user.id);
            formData.append("theme_id", postFormData.theme_id as string);
            formData.append(
                "drawing_name",
                postFormData.drawing_name as string,
            );
            await mutateAsync(formData);
        }
    };

    return (
        <ControlledFormWrapper>
            <ImagePreview image={image} imageResponse={imageResponse} />

            <ControlledFileInput handleImage={handleImage} />

            <>
                {updating && (
                    <Box
                        zIndex={2}
                        position="absolute"
                        width="100%"
                        height="100%"
                        bg="rgba(0,0,0,0.9)"
                    >
                        <Loader />
                    </Box>
                )}
            </>
            <ControlledSelect
                isLoading={isLoading}
                themeList={themeList}
                postFormData={postFormData}
                label="Theme"
                handleSelect={handleSelect}
            />

            <ControlledInput
                label="Dessin"
                handleChange={handleChange}
                name="drawing_name"
                placeholder="Nom du dessin ..."
                value={postFormData.drawing_name}
            />

            <ProgressPercentage progress={progress} />

            <ProgressBar progress={progress} />

            <UXMessageDisplay UXMessage={UXmessage} />

            <Box display="flex" width="100%" justifyContent="space-around">
                <Button colorScheme="red" type="button" onClick={removeImage}>
                    ANULER
                </Button>
                <Button colorScheme="red" type="button" onClick={fileUpload}>
                    ENVOYER
                </Button>
            </Box>
        </ControlledFormWrapper>
    );
}
