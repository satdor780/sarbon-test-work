interface BuyerAvatarProps {
  initials: string;
  color: string;
}

export function BuyerAvatar({ initials, color }: BuyerAvatarProps) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[0.6875rem] font-bold shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
