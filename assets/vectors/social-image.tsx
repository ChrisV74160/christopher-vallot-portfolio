type SocialImageCopy = {
  role: string;
  firstLine: string;
  secondLine: string;
  automation: string;
};

/** Fixed sharing layout. The generator inserts the native owl into the 72px slot. */
export function SocialImage({ copy }: { copy: SocialImageCopy }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#003f5c",
        color: "#ffffff",
        padding: "72px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 460,
          height: 460,
          borderRadius: 999,
          border: "2px solid #78a50a",
          background: "#006572",
          right: -80,
          top: -160,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 72, height: 72, flexShrink: 0 }} />
        <div style={{ fontSize: 24, color: "#ffffff" }}>
          {`Christopher Vallot · ${copy.role}`}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -4 }}>
          {copy.firstLine}
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -4 }}>
          {copy.secondLine}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
          {["Power BI", "Python", "SQL", "Data Quality", copy.automation].map(
            (item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  border: "1px solid #008b56",
                  borderRadius: 10,
                  color: "#ffffff",
                  padding: "10px 16px",
                  fontSize: 16,
                }}
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
