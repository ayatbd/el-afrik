"use client";

import Link from "next/link";
import { ArrowLeft, Pencil, Image as ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-gray-900">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="p-1 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-800" />
        </Link>
        <h1 className="text-xl font-medium text-gray-900">Profile</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[#F4F5F7] rounded-xl flex flex-col items-center justify-center py-10 mb-10">
          <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Pencil className="h-5 w-5" />
          </button>

          <div className="relative mb-4">
            <Avatar className="h-28 w-28 border-4 border-white shadow-sm">
              <AvatarImage
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback>EL</AvatarFallback>
            </Avatar>

            <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 cursor-pointer hover:bg-gray-50">
              <ImageIcon className="h-4 w-4 text-gray-600" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-400 uppercase tracking-wide">
            EL AFRIK LOUNGE
          </h2>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-gray-100 rounded-none mb-8">
            <TabsTrigger
              value="profile"
              className="rounded-none border-b-4 border-transparent px-4 pb-3 pt-2 font-semibold text-gray-500 data-[state=active]:border-[#D85C2F] data-[state=active]:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base transition-all"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="rounded-none border-b-4 border-transparent px-4 pb-3 pt-2 font-semibold text-gray-500 data-[state=active]:border-[#D85C2F] data-[state=active]:text-gray-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-base transition-all"
            >
              Change Password
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="profile"
            className="space-y-8 animate-in fade-in-50 duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <Label htmlFor="fullname" className="text-gray-700 font-normal">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  defaultValue="Giring Furqon"
                  className="h-12 border-gray-200 bg-white focus-visible:ring-[#D85C2F]"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-700 font-normal">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue="alma.lawson@ecample.com"
                  className="h-12 border-gray-200 bg-white focus-visible:ring-[#D85C2F]"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phone" className="text-gray-700 font-normal">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  defaultValue="(+33)7 00 55 57 60"
                  className="h-12 border-gray-200 bg-white focus-visible:ring-[#D85C2F]"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="dob" className="text-gray-700 font-normal">
                  Date of birth
                </Label>
                <Input
                  id="dob"
                  defaultValue="Strawberry Land"
                  className="h-12 border-gray-200 bg-white focus-visible:ring-[#D85C2F]"
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="location" className="text-gray-700 font-normal">
                  Location
                </Label>
                <Input
                  id="location"
                  defaultValue="312 3rd St. Albany, New York 12206, USA"
                  className="h-12 border-gray-200 bg-white focus-visible:ring-[#D85C2F]"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button className="bg-[#D85C2F] hover:bg-[#b04b26] text-white h-12 px-8 rounded-md text-base font-medium">
                Update
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="password">
            <div className="py-10 text-center text-gray-500">
              <div className="w-1/2 space-y-7">
                <div className="space-y-3">
                  <Label
                    htmlFor="fullname"
                    className="text-gray-700 font-normal"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    defaultValue="Giring Furqon"
                    className="h-12 border-gray-200 bg-white focus-visible:ring-[#D85C2F]"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-700 font-normal">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue="alma.lawson@ecample.com"
                    className="h-12 border-gray-200 bg-white focus-visible:ring-[#D85C2F]"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-gray-700 font-normal">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    defaultValue="(+33)7 00 55 57 60"
                    className="h-12 border-gray-200 bg-white focus-visible:ring-[#D85C2F]"
                  />
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Button className="bg-[#D85C2F] hover:bg-[#b04b26] text-white h-12 px-8 rounded-md text-base font-medium">
                Update
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
