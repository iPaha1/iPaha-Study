"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
    initialData: Course;
    courseId: string;

    };

const formSchema = z.object({
    imageUrl: z.string().min(1, { 
        message: "Image is required",
    }),
});

const ImageForm = ({
    initialData,
    courseId
}: ImageFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log('Submitting form with values:', values); // Add this log statement
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course image updated");
            toggleEdit();
            router.refresh();
        } catch { 

            console.error('Error occurred:', Error); // Add this log statement

            toast.error("Something went wrong");
        }
    };


    console.log('Rendering ImageForm with initialData:', initialData); // Add this log statement


    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    
                    {!isEditing && !initialData.imageUrl && (
                        <>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add an image
                    </>
                    )}
                        
                    {!isEditing && initialData.imageUrl && (
                        <>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit image
                    </>
                    )}

                </Button>
            </div>

            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />

                    </div>
            ) : (
                <div className="relative aspect-video mt-2">
                    <Image alt="Upload" layout="fill" objectFit="cover" className="rounded-md" src={initialData.imageUrl} />
                    
                </div>

                )
            )} 

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChanges={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended

                    </div>

                </div>

            )}

        </div>
    );

}

export default ImageForm;