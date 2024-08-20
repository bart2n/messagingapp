function TabWithIcon({
  icon,
  text,
  onClick,
}: {
  icon: any;
  text: string;
  onClick: any;
}) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-blue-600"
    >
      {icon}
      {text}
    </div>
  );
}

export default TabWithIcon;
