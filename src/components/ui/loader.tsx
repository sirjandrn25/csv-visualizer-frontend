import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

type LoaderProps = {
    className?: string;
    size?: number;
};
const Loader = ({ className, size = 20 }: LoaderProps) => {
    return <Loader2 className={cn("animate-spin", className)} size={size} />;
};

export default Loader;
