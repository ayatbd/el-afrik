"use client";

import TierModal from "@/components/modules/rewards/TierModal";
// Shadcn UI components
// If you don't have these files locally, standard HTML elements with the provided Tailwind classes will work perfectly.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RewardSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50/30 p-8 md:p-12 font-sans text-slate-900">
      {/* --- Top Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Reward Setup
        </h1>
        <TierModal />
      </div>

      {/* --- First Form Section (Reward Setup) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
        {/* Field: Create new rewards */}
        <div className="space-y-3">
          <Label
            htmlFor="create-rewards"
            className="text-base font-normal text-slate-800"
          >
            Create new rewards
          </Label>
          <Input
            id="create-rewards"
            className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
          />
        </div>

        {/* Field: Add reward expiry */}
        <div className="space-y-3">
          <Label
            htmlFor="reward-expiry"
            className="text-base font-normal text-slate-800"
          >
            Add reward expiry
          </Label>
          <Input
            id="reward-expiry"
            className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
          />
        </div>

        {/* Field: Reward visibility settings */}
        <div className="space-y-3">
          <Label
            htmlFor="visibility"
            className="text-base font-normal text-slate-800"
          >
            Reward visibility settings
          </Label>
          <Input
            id="visibility"
            className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
          />
        </div>
        {/* Empty column to maintain grid layout matches image */}
        <div className="hidden md:block"></div>
      </div>

      {/* --- Section Divider Title --- */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Point Rules
        </h2>
      </div>

      {/* --- Second Form Section (Point Rules) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-16">
        {/* Field: Points per purchase */}
        <div className="space-y-3">
          <Label
            htmlFor="points-purchase"
            className="text-base font-normal text-slate-800"
          >
            Points per purchase
          </Label>
          <Input
            id="points-purchase"
            className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
          />
        </div>

        {/* Field: Points for daily login */}
        <div className="space-y-3">
          <Label
            htmlFor="points-login"
            className="text-base font-normal text-slate-800"
          >
            Points for daily login
          </Label>
          <Input
            id="points-login"
            className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
          />
        </div>

        {/* Field: Points for reviews */}
        <div className="space-y-3">
          <Label
            htmlFor="points-reviews"
            className="text-base font-normal text-slate-800"
          >
            Points for reviews
          </Label>
          <Input
            id="points-reviews"
            className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
          />
        </div>

        {/* Field: Points for sharing */}
        <div className="space-y-3">
          <Label
            htmlFor="points-sharing"
            className="text-base font-normal text-slate-800"
          >
            Points for sharing
          </Label>
          <Input
            id="points-sharing"
            className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
          />
        </div>

        {/* Field: Referral bonus points */}
        <div className="space-y-3">
          <Label
            htmlFor="referral-points"
            className="text-base font-normal text-slate-800"
          >
            Referral bonus points
          </Label>
          <Input
            id="referral-points"
            className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
          />
        </div>

        {/* Field: Tier upgrade rules */}
        <div className="space-y-3">
          <Label
            htmlFor="tier-rules"
            className="text-base font-normal text-slate-800"
          >
            Tier upgrade rules
          </Label>
          <Input
            id="tier-rules"
            className="h-12 border-gray-200 bg-white focus-visible:ring-1 focus-visible:ring-gray-300"
          />
        </div>
      </div>

      {/* --- Footer Action --- */}
      <div className="flex justify-center mb-8">
        <Button className="bg-[#D05634] hover:bg-[#b84a2c] text-white text-lg font-medium py-6 px-16 w-full md:w-auto rounded-md shadow-sm transition-all">
          Publish
        </Button>
      </div>
    </div>
  );
}
