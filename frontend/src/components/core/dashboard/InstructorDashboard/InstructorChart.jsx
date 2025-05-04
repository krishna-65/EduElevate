import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ courses = [] }) => {
    const [currentChart, setCurrentChart] = useState("students");
    const [chartType, setChartType] = useState("pie");

    const getPrettyColors = () => [
        "#6C5CE7", "#00B894", "#0984E3", "#FD79A8", "#E17055",
        "#FAB1A0", "#81ECEC", "#55EFC4", "#D63031", "#636E72",
    ];

    const chartData = (type) => ({
        labels: courses?.map((c) => c.courseName),
        datasets: [
            {
                label: type === "students" ? "Enrolled Students" : "Total Income",
                data: courses?.map((c) =>
                    // type === "students" ? c.totalStudentsEnrolled : c.totalAmountGenerated
                type === "students" ? 20 : 10000
                ),
                backgroundColor: getPrettyColors().slice(0, courses.length),
                borderWidth: 1,
            },
        ],
    });

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "right", labels: { color: "#fff" } },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.label}: ${ctx.raw.toLocaleString()}`,
                },
            },
        },
        animation: {
            animateRotate: true,
            animateScale: true,
        },
    };

    const ChartComponent = chartType === "pie" ? Pie : Doughnut;

    return (
        <div className="bg-[#161515] rounded-2xl p-8 lg:w-[70%] m-4 shadow-lg">
            <h3 className="text-white text-2xl font-semibold mb-6">📊 Instructor Course Insights</h3>

            <div className="flex flex-wrap gap-4 mb-6">
                {["students", "income"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setCurrentChart(type)}
                        className={`px-5 py-2 text-sm rounded-full transition-all duration-200 border ${
                            currentChart === type ? "bg-gray-800 text-white" : "bg-transparent text-gray-300"
                        }`}
                    >
                        {type === "students" ? "Students Enrolled" : "Income Generated"}
                    </button>
                ))}
                <button
                    onClick={() => setChartType(chartType === "pie" ? "doughnut" : "pie")}
                    className="px-5 py-2 text-sm rounded-full border border-gray-600 text-gray-200 hover:bg-gray-700 transition-all"
                >
                    Switch to {chartType === "pie" ? "Doughnut" : "Pie"}
                </button>
            </div>

            <div className="h-[400px]">
                <ChartComponent data={chartData(currentChart)} options={options} />
            </div>
        </div>
    );
};

export default InstructorChart;
