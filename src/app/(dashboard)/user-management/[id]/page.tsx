import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PageProps = {
  params: {
    id: string;
    name: string;
    avatar: string;
    email: string;
  };
};
export default async function UserProfilePage({ params }: PageProps) {
  const { name, avatar, email } = await params;
  console.log(name);
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 md:p-14 font-sans">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/user-management"
          className="text-gray-900 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
      </div>

      <div className="mb-10">
        <Avatar className="h-32 w-32 border-4 border-white shadow-sm">
          <AvatarImage
            src={avatar}
            alt="User Profile"
            className="object-cover"
          />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl">
        <div className="space-y-3">
          <Label
            htmlFor="fullName"
            className="text-base font-normal text-gray-900"
          >
            {name}
          </Label>
          <Input
            id="fullName"
            defaultValue={name}
            className="h-12 border-gray-300 text-gray-600 bg-white focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="email"
            className="text-base font-normal text-gray-900"
          >
            {email}
          </Label>
          <Input
            id="email"
            defaultValue={email}
            className="h-12 border-gray-300 text-gray-600 bg-white focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="userType"
            className="text-base font-normal text-gray-900"
          >
            User Type
          </Label>
          <Input
            id="userType"
            defaultValue="USer"
            className="h-12 border-gray-300 text-gray-600 bg-white focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="pointBalance"
            className="text-base font-normal text-gray-900"
          >
            Point balance
          </Label>
          <Input
            id="pointBalance"
            defaultValue="0"
            className="h-12 border-gray-300 text-gray-600 bg-white focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="lastView"
            className="text-base font-normal text-gray-900"
          >
            Last View list
          </Label>
          <Input
            id="lastView"
            defaultValue="13-1-2025"
            className="h-12 border-gray-300 text-gray-600 bg-white focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-gray-400"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-normal text-gray-900">
            Loyalty tier
          </Label>
          <Select defaultValue="gold">
            <SelectTrigger className="h-12 border-gray-300 text-gray-600 bg-white focus:ring-1 focus:ring-gray-400">
              <SelectValue 
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gold" className="text-gray-600">
                Gold
              </SelectItem>
              <SelectItem value="silver" className="text-gray-600">
                Silver
              </SelectItem>
              <SelectItem value="platinum" className="text-gray-600">
                Platinum
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-12">
        <Button
          variant="outline"
          className="h-12 px-8 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 text-base font-medium transition-colors"
        >
          Block This User
        </Button>
      </div>
    </div>
  );
}
