interface Props<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}

export function CMSelect<T extends string>({ label, value, options, onChange }: Props<T>) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white text-xs">{label}</span>
      {/* Windows 95-style select wrapper */}
      <div
        className="relative inline-flex items-stretch text-black text-xs font-mono"
        style={{
          border: '2px solid',
          borderColor: '#808080 #ffffff #ffffff #808080',
          background: '#c0c0c0',
        }}
      >
        <select
          value={value}
          onChange={e => onChange(e.target.value as T)}
          className="appearance-none bg-transparent pl-1.5 pr-7 py-0.5 text-black text-xs font-mono outline-none cursor-pointer"
          style={{ minWidth: '80px' }}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {/* Dropdown arrow button */}
        <div
          className="absolute right-0 top-0 bottom-0 w-5 flex items-center justify-center pointer-events-none select-none"
          style={{
            borderLeft: '1px solid #808080',
            background: '#c0c0c0',
          }}
        >
          <span style={{ fontSize: '8px', lineHeight: 1 }}>▼</span>
        </div>
      </div>
    </div>
  );
}
