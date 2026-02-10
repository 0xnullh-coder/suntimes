interface RegionBadgeProps {
  regionId: string;
  regionName: string;
}

export default function RegionBadge({ regionId, regionName }: RegionBadgeProps) {
  return (
    <span
      data-region-id={regionId}
      className="inline-flex items-center rounded-full bg-suntimes-teal px-3 py-1 font-body text-xs font-medium text-white"
    >
      {regionName}
    </span>
  );
}
