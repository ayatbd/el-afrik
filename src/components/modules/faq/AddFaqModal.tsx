"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAddFaqMutation } from "@/redux/api/faqApi";

// Define the form structure
interface FaqFormValues {
  Ques: string;
  Answere: string;
}

export default function AddFaqModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [addFaq, { isLoading }] = useAddFaqMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormValues>();

  const onSubmit: SubmitHandler<FaqFormValues> = async (data) => {
    try {
      console.log("Form Data:", data);
      await addFaq(data).unwrap();
      toast.success("FAQ added successfully!");
      setIsOpen(false);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-[#00B25D] hover:bg-[#009e52] text-white px-6 h-11">
          <Plus className="h-4 w-4 mr-2" />
          Add A FAQ
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 bg-white p-6 md:p-8 gap-6">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add FAQ
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {/* Question Field */}
            <div className="space-y-3">
              <Label htmlFor="Ques" className="text-gray-500 font-normal">
                Question <span className="text-red-500">*</span>
              </Label>
              <Input
                id="Ques"
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

            {/* Description Field */}
            <div className="space-y-3">
              <Label htmlFor="Answere" className="text-gray-500 font-normal">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="Answere"
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
            {/* Removed DialogClose wrapper. Use state to close instead. */}
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#00B25D] hover:bg-[#00924c] text-white px-12 h-11 text-base font-medium rounded-md w-1/2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
