import "./styles.css";
import axiosBaseUrl from "../../../Axios/axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoad } from "../../../Redux/Slices/loadingSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  BarController,
  LineController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  BarController,
  LineController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const ProviderDashboard = () => {
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const [overviewData, setOverviewData] = useState(null);
  const [powerUsageByClient, setPowerUsageByClient] = useState([]);
  const [voltageDistribution, setVoltageDistribution] = useState([]);
  const [metricsSummary, setMetricsSummary] = useState(null);
  const [totalPowerUsage, setTotalPowerUsage] = useState([]);
  const [averageVoltage, setAverageVoltage] = useState([]);
  const [totalUsers, setTotalUsers] = useState(null);
  const [allMetrics, setAllMetrics] = useState([]);
  const [totalLines, setTotalLines] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const powerByClientChartRef = useRef(null);
  const voltageDistributionChartRef = useRef(null);
  const metricsSummaryChartRef = useRef(null);
  const clientCountChartRef = useRef(null);
  const totalPowerUsageChartRef = useRef(null);
  const averageVoltageChartRef = useRef(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(toggleLoad(true));
      setLoading(true);
      setError(null);
      try {
        const overviewResponse = await axiosBaseUrl.get(
          `/providers/overview/${userId}`
        );
        setOverviewData(overviewResponse.data.data);

        const powerByClientResponse = await axiosBaseUrl.get(
          `/providers/powerUsageByClient/${userId}`
        );
        setPowerUsageByClient(powerByClientResponse.data.data);

        const voltageDistributionResponse = await axiosBaseUrl.get(
          `/providers/voltageDistribution/${userId}`
        );
        const voltageData = voltageDistributionResponse.data.data.map(
          (v) => v.voltage
        );
        const voltageCounts = {};
        voltageData.forEach((v) => {
          const roundedVoltage = Math.round(v);
          voltageCounts[roundedVoltage] =
            (voltageCounts[roundedVoltage] || 0) + 1;
        });
        setVoltageDistribution(
          Object.entries(voltageCounts).sort(
            (a, b) => parseInt(a[0]) - parseInt(b[0])
          )
        );

        const metricsSummaryResponse = await axiosBaseUrl.get(
          `/providers/metricsSummary/${userId}`
        );
        setMetricsSummary(metricsSummaryResponse.data.data);

        const totalPowerUsageResponse = await axiosBaseUrl.get(
          `/providers/totalPowerUsage/${userId}`
        );
        setTotalPowerUsage(
          Array.isArray(totalPowerUsageResponse?.data?.data)
            ? totalPowerUsageResponse.data.data
            : []
        );

        const averageVoltageResponse = await axiosBaseUrl.get(
          `/providers/averageVoltage/${userId}`
        );
        setAverageVoltage(
          Array.isArray(averageVoltageResponse?.data?.data)
            ? averageVoltageResponse.data.data
            : []
        );

        const usersResponse = await axiosBaseUrl.get(
          `/providers/getAllUsers/${userId}`
        );
        setTotalUsers(usersResponse?.data?.data?.length);

        const allMetricsResponse = await axiosBaseUrl.get(
          `/providers/getAllMetrics/${userId}`
        );
        setAllMetrics(
          Array.isArray(allMetricsResponse?.data?.data)
            ? allMetricsResponse.data.data
            : []
        );

        const linesResponse = await axiosBaseUrl.get(
          `/providers/getAllLines/${userId}`
        );
        setTotalLines(usersResponse?.data?.data?.length);
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data for charts");
        console.error("Error fetching dashboard data for charts:", err);
      } finally {
        setLoading(false);
        dispatch(toggleLoad(false));
      }
    };

    fetchDashboardData();

    return () => {
      if (powerByClientChartRef.current) {
        powerByClientChartRef.current.destroy();
      }
      if (voltageDistributionChartRef.current) {
        voltageDistributionChartRef.current.destroy();
      }
      if (metricsSummaryChartRef.current) {
        metricsSummaryChartRef.current.destroy();
      }
      if (clientCountChartRef.current) {
        clientCountChartRef.current.destroy();
      }
      if (totalPowerUsageChartRef.current) {
        totalPowerUsageChartRef.current.destroy();
      }
      if (averageVoltageChartRef.current) {
        averageVoltageChartRef.current.destroy();
      }
    };
  }, [userId, dispatch]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        font: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        font: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const powerByClientData = {
    labels: powerUsageByClient.map((client) => client.client_name),
    datasets: [
      {
        label: "Power Usage (kWh)",
        data: powerUsageByClient.map((client) => client.total_power),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const voltageDistributionData = {
    labels: voltageDistribution.map((v) => v[0]),
    datasets: [
      {
        label: "Frequency",
        data: voltageDistribution.map((v) => v[1]),
        backgroundColor: "rgba(201, 203, 207, 0.8)",
        borderColor: "rgb(201, 203, 207)",
        borderWidth: 1,
      },
    ],
  };

  const metricsSummaryPieData = {
    labels: [
      "Min Power",
      "Max Power",
      "Avg Power",
      "Min Voltage",
      "Max Voltage",
      "Avg Voltage",
    ],
    datasets: [
      {
        label: "Metrics",
        data: [
          metricsSummary?.minPower,
          metricsSummary?.maxPower,
          metricsSummary?.avgPower,
          metricsSummary?.minVoltage,
          metricsSummary?.maxVoltage,
          metricsSummary?.avgVoltage,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const clientCountData = {
    labels: ["Total Clients"],
    datasets: [
      {
        label: "Number of Clients",
        data: [overviewData?.totalClients || 0],
        backgroundColor: ["rgba(99, 255, 132, 0.7)"],
        borderColor: ["rgba(99, 255, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const totalPowerUsageData = {
    labels: Array.isArray(totalPowerUsage)
      ? totalPowerUsage.map((item) =>
          new Date(item.timestamp).toLocaleDateString()
        )
      : [],
    datasets: [
      {
        label: "Total Power Usage (kWh)",
        data: Array.isArray(totalPowerUsage)
          ? totalPowerUsage.map((item) => item.total_power)
          : [],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const averageVoltageData = {
    labels: Array.isArray(averageVoltage)
      ? averageVoltage.map((item) =>
          new Date(item.timestamp).toLocaleDateString()
        )
      : [],
    datasets: [
      {
        label: "Average Voltage (V)",
        data: Array.isArray(averageVoltage)
          ? averageVoltage.map((item) => item.average_voltage)
          : [],
        fill: false,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="provider-dashboard-container">
      <div className="main-content">
        <h2 className="main-content-title section-titles">Dashboard</h2>
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading dashboard data...</p>
          </div>
        )}
        {error && (
          <div className="error-message">
            Error loading dashboard data: {error}
          </div>
        )}
        {!loading && !error && (
          <div className="charts-row">
            <div className="chart-widget">
              <h3>Client Power Usage Distribution</h3>
              {powerUsageByClient.length > 0 ? (
                <Bar
                  key="powerByClientChart"
                  data={powerByClientData}
                  options={chartOptions}
                  ref={powerByClientChartRef}
                />
              ) : (
                <p>No power usage data available for clients this month.</p>
              )}
            </div>

            <div className="chart-widget voltage-distribution-widget">
              <h3>Voltage Frequency Distribution</h3>
              {voltageDistribution.length > 0 ? (
                <Line
                  key="voltageDistributionChart"
                  data={voltageDistributionData}
                  options={lineChartOptions}
                  ref={voltageDistributionChartRef}
                />
              ) : (
                <p>No voltage distribution data available.</p>
              )}
            </div>

            <div className="chart-widget">
              <h3>Key Metrics Snapshot</h3>
              {metricsSummary ? (
                <Doughnut
                  key="metricsSummaryChart"
                  data={metricsSummaryPieData}
                  options={chartOptions}
                  ref={metricsSummaryChartRef}
                />
              ) : (
                <p>No metrics summary data available.</p>
              )}
            </div>

            <div className="chart-widget">
              <h3>Total Client Count</h3>
              {overviewData ? (
                <Pie
                  key="clientCountChart"
                  data={clientCountData}
                  options={chartOptions}
                  ref={clientCountChartRef}
                />
              ) : (
                <p>No overview data available to display client count.</p>
              )}
            </div>

            <div className="chart-widget">
              <h3>Total Power Usage Over Time</h3>
              {totalPowerUsage.length > 0 ? (
                <Line
                  key="totalPowerUsageChart"
                  data={totalPowerUsageData}
                  options={chartOptions}
                  ref={totalPowerUsageChartRef}
                />
              ) : (
                <p>No total power usage data available.</p>
              )}
            </div>

            <div className="chart-widget">
              <h3>Average Voltage Over Time</h3>
              {averageVoltage.length > 0 ? (
                <Line
                  key="averageVoltageChart"
                  data={averageVoltageData}
                  options={chartOptions}
                  ref={averageVoltageChartRef}
                />
              ) : (
                <p>No average voltage data available.</p>
              )}
            </div>

            <div className="metric-card">
              <h3>Total Users</h3>
              <p className="metric-value">
                {totalUsers !== null ? totalUsers : "N/A"}
              </p>
            </div>

            <div className="metric-card">
              <h3>Total Lines</h3>
              <p className="metric-value">
                {totalLines !== null ? totalLines : "N/A"}
              </p>
            </div>

            <div className="chart-widget all-metrics-widget">
              <h3>All Metrics</h3>
              {allMetrics.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMetrics.map((metric, index) => (
                      <tr key={index}>
                        <td>{metric.metric_name}</td>
                        <td>{metric.metric_value}</td>
                        <td>{new Date(metric.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No detailed metrics data available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
