import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            //update the image state
            setImage(file)

            //generate preview url form the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview)
            console.log("image did preview")
        }
    }

    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
    }

    const handleChooseFile = () => {
        inputRef.current.click()
    }

  return (
    <div className="flex justify-center mb-6">
        <input type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden "
        />

        {!image ? (
            <div className="w-20 h-20 flex items-center justify-center
             bg-purple-100 rounded-full relative">
                <LuUser className="text-4xl text-primary" />

                <button 
                type="button"
                className="w-8 h-8 flex items-center justify-center bg-primary
                text-white rounded-full absolute -bottom-1 -right-1"
                onClick={handleChooseFile}
                >
                    <LuUpload />
                </button>
            </div>
            
        ) : (
            <div className="relative">
                <img 
                src={previewUrl} 
                alt="profile photo"
                className="w-20 h-20 rounded-full object-cover"
                />

                <button
                type="button"
                onClick={handleRemoveImage}
                className="w-8 h-8 flex items-center justify-center
                 bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
                >
                    <LuTrash />
                </button>
            </div>
        )}

    </div>
  )
}

export default ProfilePhotoSelector

















