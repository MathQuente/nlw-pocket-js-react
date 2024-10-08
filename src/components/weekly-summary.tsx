import { CheckCircle2, Plus } from 'lucide-react'
import { InOrbitIcon } from './in-orbit-icon'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from './ui/button'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'

import type { GetSummaryResponse } from '../http/get-summary'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { PendingGoals } from './pending-goals'

interface WeeklySummaryProps {
  summary: GetSummaryResponse['summary']
}

export function WeeklySummary({ summary }: WeeklySummaryProps) {
  const firstyDayOfWeek = dayjs()
    .startOf('week')
    .locale('pt-br')
    .format('DD MMM')

  const lastDayOfWeek = dayjs().endOf('week').locale('pt-br').format('D MMM')

  const completedPercentage = Math.round(
    (summary.completed * 100) / summary.total
  )

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {firstyDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress max={15} value={8}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{' '}
            <span className="text-zinc-100">{summary.completed}</span> de{' '}
            <span className="text-zinc-100">{summary.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>
          {Object.entries(summary.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).locale('pt-br').format('dddd')
            const formatedDate = dayjs(date)
              .locale('pt-br')
              .format('DD [de] MMM')
            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium ">
                  <span className="capitalize">{weekDay} </span>
                  <span className="text-zinc-400 text-sm">
                    ({formatedDate})
                  </span>
                </h3>
                <ul className="flex flex-col gap-3">
                  {goals.map(goal => {
                    const time = dayjs(goal.createdAt)
                      .locale('pt-br')
                      .format('HH:mm')
                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          Você completou "
                          <span className="text-zinc-100">{goal.title}</span>"
                          às <span className="text-zinc-100">{time}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
