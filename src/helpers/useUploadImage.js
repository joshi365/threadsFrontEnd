import { useState } from "react";
import imageCompression from "browser-image-compression";
import useShowToastMessage from "../components/useShowToast";

const useUploadImage = () => {
    const [imageUrl, setImageUrl] = useState("");

    const showToast = useShowToastMessage()

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/")) {
            try {
                // Options for image compression
                const options = {
                    maxSizeMB: 1, // Maximum size in MB (adjust as needed)
                    maxWidthOrHeight: 1024, // Maximum width or height (adjust as needed)
                    useWebWorker: true, // Use web workers for better performance
                    fileType: "image/jpeg", // Output file type
                };

                // Compress the image
                const compressedFile = await imageCompression(file, options);

                // Read the compressed image as a data URL
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageUrl(reader.result);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error("Error compressing image:", error);
                showToast("Error", "Failed to compress image", "error");
                setImageUrl("null");
            }
        } else {
            showToast("Invalid file type", "Please select an image file", "error");
            setImageUrl("null");
        }
    };

    return { handleImageChange, imageUrl, setImageUrl };
};

export default useUploadImage;