"use client";

import { useEffect, useState } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEditFaqMutation } from "@/redux/api/faqApi";

// Interface for the FAQ Item (adjust 'id' or '_id' based on your DB)
interface FaqItem {
  _id: string;
  question?: string;
  answer?: string;
  Ques?: string;
  Answere?: string;
}

interface EditFaqModalProps {
  faqData: FaqItem;
}

interface FaqFormValues {
  Ques: string;
  Answere: string;
}

export default function EditFaqModal({ faqData }: EditFaqModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editFaq, { isLoading }] = useEditFaqMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormValues>({
    defaultValues: {
      Ques: faqData.Ques,
      Answere: faqData.Answere,
    },
  });

  // Reset form values if faqData changes or modal opens
  useEffect(() => {
    if (isOpen) {
      reset({
        Ques: faqData.Ques,
        Answere: faqData.Answere,
      });
    }
  }, [isOpen, faqData, reset]);

  const onSubmit: SubmitHandler<FaqFormValues> = async (data) => {
    try {
      // Assuming your API expects { id, data }
      await editFaq({ id: faqData._id, data }).unwrap();

      toast.success("FAQ updated successfully!");
      setIsOpen(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Object &&
        "data" in error &&
        error.data instanceof Object &&
        "message" in error.data
          ? (error.data.message as string)
          : "Failed to update FAQ";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* Trigger Button - Styled typically as an icon button for Edit */}
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-green-50 text-gray-500 hover:text-[#00B25D]"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-6 md:p-8 gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* Question Field */}
            <div className="space-y-3">
              <Label htmlFor="edit-Ques" className="text-gray-500 font-normal">
                Question <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-Ques"
                {...register("Ques", { required: "Question is required" })}
                placeholder="What is your question?"
                className="h-12 border-gray-200 bg-white placeholder:text-gray-400 focus-visible:ring-[#4BD37B]"
              />
              {errors.Ques && (
                <span className="text-xs text-red-500">
                  {errors.Ques.message}
                </span>
              )}
            </div>

            {/* Answer Field */}
            <div className="space-y-3">
              <Label
                htmlFor="edit-Answere"
                className="text-gray-500 font-normal"
              >
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="edit-Answere"
                {...register("Answere", {
                  required: "Description is required",
                })}
                placeholder="Write answer here...."
                className="min-h-37.5 border-gray-200 bg-white resize-none p-3 placeholder:text-gray-400 focus-visible:ring-[#4BD37B]"
              />
              {errors.Answere && (
                <span className="text-xs text-red-500">
                  {errors.Answere.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#00B25D] hover:bg-[#00924c] text-white px-12 h-11 text-base font-medium rounded-md w-1/2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
