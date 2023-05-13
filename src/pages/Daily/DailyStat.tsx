import { useState, useEffect } from "react"
import { Chart } from "primereact/chart"
import _ from "lodash"

export function DailyStat(props: any) {
    const [chartData, setChartData] = useState({})
    const [chartOptions, setChartOptions] = useState({})
    const [dataWeek, setDataWeek] = useState<any>([])

    const _data = [
        {
            name: "sidoul",
            checked: [
                {
                    date: "2023-05-01",
                    isChecked: true,
                },
                {
                    date: "2023-05-02",
                    isChecked: false,
                },
                {
                    date: "2023-05-03",
                    isChecked: true,
                },
                {
                    date: "2023-05-04",
                    isChecked: true,
                },
                {
                    date: "2023-05-05",
                    isChecked: false,
                },
                {
                    date: "2023-05-06",
                    isChecked: false,
                },
                {
                    date: "2023-05-07",
                    isChecked: true,
                },
                {
                    date: "2023-05-08",
                    isChecked: true,
                },
                {
                    date: "2023-05-09",
                    isChecked: false,
                },
                {
                    date: "2023-05-10",
                    isChecked: true,
                },
                {
                    date: "2023-05-11",
                    isChecked: true,
                },
                {
                    date: "2023-05-12",
                    isChecked: true,
                },
                {
                    date: "2023-05-13",
                    isChecked: false,
                },
                {
                    date: "2023-05-14",
                    isChecked: true,
                },
            ],
            id: 1,
        },
    ]
    const calculateData = (data: any) => {

        let occ: number = 0
        const datas: any = []
        data.checked.forEach((item: any, index: number) => {
            let occurrence = item.isChecked ? ++occ : occ
            if ((index + 1) % 7 === 0 || (index + 1) === data.checked.length) {
                datas.push({ date: item.date, occurrence: occurrence })
                occ = 0
            }
        })
        setDataWeek(datas)
    }

    useEffect(() => {
        calculateData(props.dataStat)
        const documentStyle = getComputedStyle(document.documentElement)
        const textColor = documentStyle.getPropertyValue("--text-color")
        const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary")
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border")
        const data = {
            labels: ["first day", ...dataWeek?.map((data: any) => data.date)],
            datasets: [
                {
                    label: "Third Dataset",
                    data: [0, ...dataWeek?.map((data: any) => data.occurrence)],
                    fill: true,
                    borderColor: documentStyle.getPropertyValue("--orange-500"),
                    tension: 0.4,
                    backgroundColor: "rgba(255,167,38,0.2)",
                },
            ],
        }
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        }

        setChartData(data)
        setChartOptions(options)
    }, [!_.isEmpty(dataWeek)])

    return (
        <div className='card'>
            <Chart type='line' data={chartData} options={chartOptions} />
        </div>
    )
}
