/* eslint-disable react/no-children-prop */
/* eslint-disable no-console */
import React, { ChangeEvent, ReactElement, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
    Input,
    Box,
    Button,
    Text,
    FormControl,
    InputLeftAddon,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import Image from "next/image";
import { UAParser } from "ua-parser-js";
import { BsCheckLg } from "react-icons/bs";
import ControlledSelect from "../Inputs/ControlledSelect";
import { BodyPicturePost, TTheme } from "../../..";
import axiosInstance from "../../fetcher/axiosInstance";

const parser = new UAParser();

export default function UploadImageForm(): ReactElement {
    const [image, setImage] = useState<File | undefined>();
    const [postFormData, setPostFormData] = useState<BodyPicturePost>({
        author_id: "",
        drawing_name: "",
    });
    const [imageResponse, setImageResponse] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [themeList, setThemeList] = useState<TTheme[]>([]);

    const device = parser.getDevice();

    console.log(themeList);

    const {
        data: ThemesRes,
        isLoading,
        error: queryError,
    } = useQuery(
        "getThemes",
        () => axiosInstance.get("/themes").then((r) => r.data),
        {
            onSuccess: (data) => {
                setThemeList(data);
            },
        },
    );

    const { mutateAsync } = useMutation(
        (newImage: FormData) =>
            axiosInstance
                .post("/upload", newImage, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (p) => {
                        setProgress((p.loaded / p.total) * 100);
                    },
                })
                .then((r) => r.data)
                .catch((err) => {
                    setError(err.response.data.message);
                }),
        {
            onSuccess: (data) => {
                if (data !== undefined) {
                    setImageResponse(data.url);
                }
                setProgress(0);
                setError("DESSIN ENVOYE AVEC SUCCES !");
            },
            onError: (err) => {
                console.log("ERROR UPLOAD", err);
            },
            useErrorBoundary: true,
        },
    );

    const removeImage = () => {
        setImage(undefined);
        setPostFormData({
            author_id: "",
            theme_id: "",
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
        console.log(postFormData);
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setPostFormData({
            ...postFormData,
            [e.target.name]: e.target.value,
        });
    };

    const fileUpload = async () => {
        setProgress(0);
        if (image && postFormData) {
            console.log(postFormData.author_id, postFormData.theme_id);
            const formData = new FormData();
            formData.append("image", image);
            formData.append(
                "author_id",
                "2e39c0b4-ad19-4412-b9a7-d42b226a27e6" as string,
            );
            formData.append("theme_id", postFormData.theme_id as string);
            formData.append(
                "drawing_name",
                postFormData.drawing_name as string,
            );
            await mutateAsync(formData);
        }
    };

    return (
        <FormControl
            p={4}
            height="100%"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="column"
            color="white"
            action=""
        >
            <Box
                position="relative"
                display="flex"
                justifyContent="center"
                width={200}
                height={200}
            >
                {imageResponse || image ? (
                    <Image layout="fill" src={URL.createObjectURL(image)} />
                ) : (
                    <Image
                        src="/icons/drawing_upload.png"
                        width={100}
                        height={100}
                        layout="fixed"
                    />
                )}
            </Box>
            <Input
                boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.8)"
                width="100%"
                accept="image/*"
                multiple={false}
                type="file"
                name="image"
                onChange={handleImage}
            />
            {device.type === "mobile" && (
                <Input
                    width="100%"
                    onChange={handleImage}
                    accept="image/*"
                    multiple={false}
                    type="file"
                    name="image"
                    capture="environment"
                />
            )}

            <ControlledSelect
                themeList={themeList}
                postFormData={postFormData}
                handleSelect={handleSelect}
            />
            <InputGroup>
                <InputLeftAddon
                    backgroundColor="gray.200"
                    color="black"
                    children="Auteur"
                />
                <Input
                    color="black"
                    isRequired
                    boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.5)"
                    backgroundColor="gray.300"
                    width="100%"
                    type="text"
                    value={postFormData?.author_id}
                    name="author_id"
                    placeholder="Auteur"
                    _placeholder={{ color: "gray.300" }}
                    border="2px"
                    onChange={handleChange}
                />
                <InputRightElement children={<BsCheckLg color="green.500" />} />
            </InputGroup>
            <InputGroup>
                <InputLeftAddon
                    backgroundColor="gray.300"
                    color="black"
                    children="Dessin"
                />
                <Input
                    isRequired
                    color="black"
                    boxShadow="inset 0px 1px 8px rgba(0, 0, 0, 0.5)"
                    backgroundColor="gray.300"
                    width="100%"
                    placeholder="Nom du Dessin ..."
                    value={postFormData?.drawing_name}
                    _placeholder={{ color: "gray.300" }}
                    type="text"
                    name="drawing_name"
                    border="2px"
                    onChange={handleChange}
                />
            </InputGroup>
            <Text width="100%" textAlign="left">
                Upload {progress ? Math.floor(progress) : "0"}%{" "}
            </Text>
            <Box
                display="flex"
                justifyContent="start"
                borderColor="gray.300"
                width="100%"
                height="10"
                border="2px"
            >
                <Box
                    backgroundColor="white"
                    height="100%"
                    width="100%"
                    style={{ width: `${progress}%` }}
                />
            </Box>
            {error && <Text color="text.error">{error}</Text>}
            <Box display="flex" width="100%" justifyContent="space-around">
                <Button colorScheme="red" type="button" onClick={removeImage}>
                    ANULER
                </Button>
                <Button colorScheme="purple" type="button" onClick={fileUpload}>
                    ENVOYER
                </Button>
            </Box>
        </FormControl>
    );
}
