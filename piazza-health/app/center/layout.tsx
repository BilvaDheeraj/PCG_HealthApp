import CenterLayoutWrapper from "@/components/center/CenterLayoutWrapper";

export default function CenterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // #0B1120 is a deep premium blue-black
    return <CenterLayoutWrapper>{children}</CenterLayoutWrapper>;
}
