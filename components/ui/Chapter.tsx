export function Chapter({ number, children }: {
    number: string;
    children: React.ReactNode;
}) { return <div className="chapter"><span className="chapter-dot"/><span>{number} / {children}</span></div>; }
