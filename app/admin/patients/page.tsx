import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Filter, User, Calendar, Phone } from "lucide-react"

export default function PatientsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-balance">Quản lý Bệnh nhân</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Thêm bệnh nhân mới
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm bệnh nhân..." className="pl-8" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Lọc
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Nguyễn Văn An",
            age: 45,
            phone: "0901234567",
            lastVisit: "15/12/2024",
            condition: "Đau lưng mãn tính",
          },
          { name: "Trần Thị Bình", age: 38, phone: "0912345678", lastVisit: "14/12/2024", condition: "Mất ngủ" },
          { name: "Lê Minh Cường", age: 52, phone: "0923456789", lastVisit: "13/12/2024", condition: "Cao huyết áp" },
          { name: "Phạm Thị Dung", age: 29, phone: "0934567890", lastVisit: "12/12/2024", condition: "Đau đầu" },
          { name: "Hoàng Văn Em", age: 61, phone: "0945678901", lastVisit: "11/12/2024", condition: "Tiểu đường" },
          { name: "Vũ Thị Phương", age: 34, phone: "0956789012", lastVisit: "10/12/2024", condition: "Dạ dày" },
        ].map((patient, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  {patient.name}
                </CardTitle>
                <Badge variant="secondary">{patient.age} tuổi</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" />
                {patient.phone}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                Khám gần nhất: {patient.lastVisit}
              </div>
              <div className="text-sm">
                <span className="font-medium">Triệu chứng:</span> {patient.condition}
              </div>
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Xem hồ sơ
                </Button>
                <Button size="sm" className="flex-1">
                  Đặt lịch khám
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
