export function timeAgo(utcTimestamp: string): string {
  const postDate = new Date(utcTimestamp); 
  const now = new Date();

  const diffMs = now.getTime() - postDate.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return postDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getCount(count: number): string {
  if (count >= 1000000000) {
    const billions = count / 1000000000;
    return billions % 1 === 0 ? `${billions.toFixed(0)}B` : `${billions.toFixed(1)}B`.replace('.0', '');
  }
  
  if (count >= 1000000) {
    const millions = count / 1000000;
    return millions % 1 === 0 ? `${millions.toFixed(0)}M` : `${millions.toFixed(1)}M`.replace('.0', '');
  }
  
  if (count >= 1000) {
    const thousands = count / 1000;
    return thousands % 1 === 0 ? `${thousands.toFixed(0)}k` : `${thousands.toFixed(1)}k`.replace('.0', '');
  }
  
  return count.toString();
}