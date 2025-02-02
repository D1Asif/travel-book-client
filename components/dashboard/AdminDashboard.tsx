import CircleChartCard, { CircleChartProps } from "./CircleChartCard";

const data: CircleChartProps[] = [
  {
    title: "Revenue",
    color: "primary",
    total: 2450,
    chartData: [{ name: "Monthly", value: 1840, fill: "hsl(var(--heroui-primary))" }],
  },
  {
    title: "Engagement",
    color: "secondary",
    total: 4200,
    chartData: [{ name: "Daily Views", value: 3150, fill: "hsl(var(--heroui-secondary))" }],
  },
  {
    title: "Conversion",
    color: "success",
    total: 1000,
    chartData: [{ name: "Sales", value: 750, fill: "hsl(var(--heroui-success))" }],
  },
  {
    title: "Bounce Rate",
    color: "warning",
    total: 100,
    chartData: [{ name: "Exits", value: 80, fill: "hsl(var(--heroui-warning))" }],
  },
  {
    title: "Errors",
    color: "danger",
    total: 500,
    chartData: [{ name: "Issues", value: 450, fill: "hsl(var(--heroui-danger))" }],
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl pb-6">Admin Dashboard</h2>
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {data.map((item, index) => (
          <CircleChartCard key={index} {...item} />
        ))}
      </div>
    </div>
  )
}
