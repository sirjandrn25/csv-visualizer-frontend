"use client";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { FileStatisticsCardInfoProps } from "./display.file.statistics";
const StatisticChart = ({
    mean,
    std,
    min,
    max,
    count,
}: FileStatisticsCardInfoProps) => {
    // Chart data
    const chartData = {
        labels: ["Statistics Data "],
        datasets: [
            {
                label: "Count",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
                data: [count],
            },
            {
                label: "Min",
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
                data: [min],
            },
            {
                label: "Max",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                data: [max],
            },

            {
                label: "Mean",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                data: [mean],
            },
            {
                label: "Standard Deviation",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
                data: [std],
            },
        ],
    };

    // Chart options
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context?.dataset?.label || "";
                        return label + ": " + context.parsed.y;
                    },
                },
            },
        },
    };

    return (
        <Bar
            data={chartData}
            className="w-full h-full"
            options={chartOptions}
        />
    );
};

export default StatisticChart;
