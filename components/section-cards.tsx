import {
  IconTrendingDown,
  IconTrendingUp,
  IconUserCheck,
  IconCalendar,
  IconMedicineSyrup,
  IconCash,
} from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Bệnh nhân hôm nay</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">24</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +15%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <IconUserCheck className="size-4" />
            Tăng so với tuần trước
          </div>
          <div className="text-muted-foreground">Lượng bệnh nhân ổn định</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Lịch hẹn tuần này</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">156</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <IconCalendar className="size-4" />
            Đặt lịch tăng đều
          </div>
          <div className="text-muted-foreground">Phục vụ tốt nhu cầu khám</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Doanh thu tháng</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">45.2M</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <IconCash className="size-4" />
            Tăng trưởng ổn định
          </div>
          <div className="text-muted-foreground">Đạt mục tiêu đề ra</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Thuốc đông y</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">89%</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <IconMedicineSyrup className="size-4" />
            Tồn kho còn đủ
          </div>
          <div className="text-muted-foreground">Cần bổ sung một số vị thuốc</div>
        </CardFooter>
      </Card>
    </div>
  )
}
