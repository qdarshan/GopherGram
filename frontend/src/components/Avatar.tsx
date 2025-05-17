type AvatarProps = {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
};

export default function Avatar({src, alt, name, size = 'md'}: AvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-medium ${sizeMap[size]}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="rounded-full object-cover h-full w-full"
        />
      ) : (
        initials
      )}
    </div>
  );
};
