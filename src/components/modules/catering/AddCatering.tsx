interface AddCateringProps {
  cateringId?: string; // This is what allows the "Edit Mode"
  onSuccess?: () => void;
}

const AddCatering = ({ cateringId, onSuccess }: AddCateringProps) => {
  // ... rest of logic
};
