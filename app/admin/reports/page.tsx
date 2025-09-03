import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Users, Calendar, DollarSign, Download, Filter } from "lucide-react"

const monthlyData = [
  { month: "T1", patients: 120, revenue: 45000000 },
  { month: "T2", patients: 135, revenue: 52000000 },
  { month: "T3", patients: 150, revenue: 58000000 },
  { month: "T4", patients: 142, revenue: 55000000 },
  { month: "T5", patients: 168, revenue: 62000000 },
  { month: "T6", patients: 175, revenue: 68000000 },
]

const diseaseData = [
  { name: "Đau lưng mãn tính", value: 35, color: "hsl(var(--primary))" },
  { name: "Mất ngủ", value: 25, color: "hsl(var(--secondary))" },
  { name: "Cao huyết áp", value: 20, color: "hsl(var(--accent))" },
  { name: "Tiểu đường", value: 15, color: "hsl(var(--muted))" },
  { name: "Khác", value: 5, color: "hsl(var(--muted-foreground))" },
]

export default function ReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-balance">Báo cáo thống kê</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Lọc theo thời gian
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng bệnh nhân</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt khám tháng này</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">175</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu tháng</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.000.000₫</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ hài lòng</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Thống kê bệnh nhân theo tháng</CardTitle>
            <CardDescription>Số lượng bệnh nhân và doanh thu 6 tháng gần đây</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => [
                    name === "patients" ? `${value} bệnh nhân` : `${value.toLocaleString()}₫`,
                    name === "patients" ? "Số bệnh nhân" : "Doanh thu",
                  ]}
                />
                <Bar yAxisId="left" dataKey="patients" fill="hsl(var(--primary))" />
                <Bar yAxisId="right" dataKey="revenue" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Phân bố bệnh lý</CardTitle>
            <CardDescription>Tỷ lệ các bệnh lý thường gặp</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
