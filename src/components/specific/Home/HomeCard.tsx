import { Card, CardBody } from "@heroui/react";
import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface HomeCardProps {
  title: string;
  count: number;
  Icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  count,
  Icon,
  iconColor,
  iconBgColor,
}) => {
  return (
    <Card className="p-2">
      <CardBody>
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium text-gray-500">{title}</h1>
          <div className={twMerge(iconBgColor, "p-1 rounded-xl")}>
            {<Icon className={twMerge(iconColor, "w-6 h-6")} />}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">{count}</h2>
      </CardBody>
    </Card>
  );
};

export default HomeCard;
