import "./styles.css";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoad } from "../../../Redux/Slices/loadingSlice";
import ProviderDashboardService from "../Services/ProviderDashboardService/ProviderDashboardService";
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

  // State declarations
  const [dashboardData, setDashboardData] = useState({
    overviewData: null,
    powerUsageByClient: [],
    voltageDistribution: [],
    metricsSummary: null,
    totalPowerUsage: [],
    averageVoltage: [],
    totalUsers: null,
    allMetrics: [],
    totalLines: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Destructure data from state for easier access
  const {
    overviewData,
    powerUsageByClient,
    voltageDistribution,
    metricsSummary,
    totalPowerUsage,
    averageVoltage,
    totalUsers,
    allMetrics,
    totalLines,
  } = dashboardData;

  // Chart refs for cleanup
  const chartRefs = {
    powerByClientChart: useRef(null),
    voltageDistributionChart: useRef(null),
    metricsSummaryChart: useRef(null),
    clientCountChart: useRef(null),
    totalPowerUsageChart: useRef(null),
    averageVoltageChart: useRef(null),
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(toggleLoad(true));
      setLoading(true);
      setError(null);

      try {
        const data = await ProviderDashboardService.fetchAllDashboardData(
          userId
        );
        setDashboardData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
        dispatch(toggleLoad(false));
      }
    };

    fetchDashboardData();

    // Cleanup function for chart instances
    return () => {
      Object.values(chartRefs).forEach((ref) => {
        if (ref.current) {
          ref.current.destroy();
        }
      });
    };
  }, [userId, dispatch]);

  // Chart configuration objects
  const chartConfigs = {
    standard: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          text: "Chart",
          font: { size: 14 },
        },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },

    voltage: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          font: { size: 14 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 200,
          max: 250,
        },
      },
    },

    line: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          font: { size: 14 },
        },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  };

  // Chart data preparation
  const chartData = {
    powerByClient: {
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
    },

    voltageDistribution: {
      labels: voltageDistribution.map((v) => v[0]),
      datasets: [
        {
          label: "Frequency",
          data: voltageDistribution.map((v) => v[1]),
          backgroundColor: "rgba(3, 60, 173, 0.8)",
          borderColor: "rgb(201, 203, 207)",
          borderWidth: 1,
        },
      ],
    },

    metricsSummary: {
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
    },

    clientCount: {
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
    },

    totalPowerUsage: {
      labels: totalPowerUsage.map((item) =>
        new Date(item.timestamp).toLocaleDateString()
      ),
      datasets: [
        {
          label: "Total Power Usage (kWh)",
          data: totalPowerUsage.map((item) => item.total_power),
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    },

    averageVoltage: {
      labels: averageVoltage.map((item) =>
        new Date(item.timestamp).toLocaleDateString()
      ),
      datasets: [
        {
          label: "Average Voltage (V)",
          data: averageVoltage.map((item) => item.average_voltage),
          fill: false,
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          tension: 0.1,
        },
      ],
    },
  };

  // Helper function to check if data is available
  const hasData = (data) => {
    if (Array.isArray(data)) {
      return data.length > 0;
    }
    return data !== null && data !== undefined;
  };

  return (
    <div className="provider-dashboard-container">
      <div className="main-content">
        <h2 className="main-content-title section-titles un-centered">Dashboard</h2>

        {/* Loading state */}
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading dashboard data...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="error-message">
            Error loading dashboard data: {error}
          </div>
        )}

        {/* Dashboard content */}
        {!loading && !error && (
          <div className="charts-row">
            {/* Power Usage By Client Chart */}
            <div className="chart-widget">
              <h3>Client Power Usage Distribution</h3>
              {hasData(powerUsageByClient) ? (
                <Bar
                  key="powerByClientChart"
                  data={chartData.powerByClient}
                  options={chartConfigs.line}
                  ref={chartRefs.powerByClientChart}
                />
              ) : (
                <p>No power usage data available for clients this month.</p>
              )}
            </div>

            {/* Voltage Distribution Chart */}
            <div className="chart-widget voltage-distribution-widget">
              <h3>Voltage Frequency Distribution</h3>
              {hasData(voltageDistribution) ? (
                <Line
                  key="voltageDistributionChart"
                  data={chartData.voltageDistribution}
                  options={chartConfigs.line}
                  ref={chartRefs.voltageDistributionChart}
                />
              ) : (
                <p>No voltage distribution data available.</p>
              )}
            </div>

            {/* Metrics Summary Chart */}
            <div className="chart-widget">
              <h3>Key Metrics Snapshot</h3>
              {hasData(metricsSummary) ? (
                <Doughnut
                  key="metricsSummaryChart"
                  data={chartData.metricsSummary}
                  options={chartConfigs.standard}
                  ref={chartRefs.metricsSummaryChart}
                />
              ) : (
                <p>No metrics summary data available.</p>
              )}
            </div>

            {/* Client Count Chart */}
            <div className="chart-widget">
              <h3>Total Client Count</h3>
              {hasData(overviewData) ? (
                <Pie
                  key="clientCountChart"
                  data={chartData.clientCount}
                  options={chartConfigs.standard}
                  ref={chartRefs.clientCountChart}
                />
              ) : (
                <p>No overview data available to display client count.</p>
              )}
            </div>

            {/* Total Power Usage Chart */}
            <div className="chart-widget">
              <h3>Total Power Usage Over Time</h3>
              {hasData(totalPowerUsage) ? (
                <Line
                  key="totalPowerUsageChart"
                  data={chartData.totalPowerUsage}
                  options={chartConfigs.line}
                  ref={chartRefs.totalPowerUsageChart}
                />
              ) : (
                <p>No total power usage data available.</p>
              )}
            </div>

            {/* Average Voltage Chart */}
            <div className="chart-widget">
              <h3>Average Voltage Over Time</h3>
              {hasData(averageVoltage) ? (
                <Line
                  key="averageVoltageChart"
                  data={chartData.averageVoltage}
                  options={chartConfigs.voltage}
                  ref={chartRefs.averageVoltageChart}
                />
              ) : (
                <p>No average voltage data available.</p>
              )}
            </div>

            {/* Metric Cards */}
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

            {/* All Metrics Table */}
            <div className="chart-widget all-metrics-widget">
              <h3>All Metrics</h3>
              {hasData(allMetrics) ? (
                <div className="scrollable-table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Voltage</th>
                        <th>Current</th>
                        <th>Power</th>
                        <th>Energy</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMetrics.map((metric) => (
                        <tr key={metric.id}>
                          <td>{metric.id}</td>
                          <td>{metric.voltage}</td>
                          <td>{metric.current}</td>
                          <td>{metric.power}</td>
                          <td>{metric.energy}</td>
                          <td>
                            {new Date(metric.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
