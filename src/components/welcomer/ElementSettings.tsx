interface ElementSettingsProps {
  settings: Record<string, any>;
  onChange: (key: string, value: any) => void;
}

const ElementSettings: React.FC<ElementSettingsProps> = ({
  settings,
  onChange,
}) => (
  <>
    {Object.entries(settings).map(([key, value]) => (
      <div key={key}>
        <label>
          {key}:
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(key, e.target.value)}
          />
        </label>
      </div>
    ))}
  </>
);
export default ElementSettings;
