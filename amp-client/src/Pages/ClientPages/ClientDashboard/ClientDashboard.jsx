import "./styles.css";
import { Line, Bar } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoad } from "../../../Redux/Slices/loadingSlice";
import ClientDashboardService from "../Services/ClientDashboardService/ClientDashboardService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ClientDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const loading = useSelector((state) => state.loading.loadingState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(toggleLoad(true));
      try {
        const data = await ClientDashboardService.fetchClientDashboardData(userId);
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        dispatch(toggleLoad(false));
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, dispatch]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">Error loading dashboard data: {error}</div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  const powerUsageData = {
    labels: Object.keys(dashboardData.powerUsagePerDay),
    datasets: [
      {
        label: "Power Usage (in Kilowatts)",
        data: Object.values(dashboardData.powerUsagePerDay),
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "#28a745",
        pointBackgroundColor: "#28a745",
        pointBorderColor: "#fff",
        tension: 0.3,
      },
    ],
  };

  const cumulativePowerUsageData = {
    labels: Object.keys(dashboardData.cumulativePowerUsage),
    datasets: [
      {
        label: "Cumulative Power Usage (in Kilowatts)",
        data: Object.values(dashboardData.cumulativePowerUsage).map((arr) =>
          Math.max(...arr)
        ),
        backgroundColor: "rgba(255, 193, 7, 0.6)",
        borderColor: "#ffc107",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: "#555",
        },
        grid: {
          borderColor: "#eee",
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        title: {
          display: true,
          text: "Kilowatts",
          color: "#555",
        },
        grid: {
          borderColor: "#eee",
        },
      },
    },
  };

  return (
    <div className="client-dashboard-container">
      <h2>Client Dashboard</h2>

      <div className="charts-row">
        <div className="chart-widget">
          <h3>Power Usage per Day</h3>
          {Object.keys(powerUsageData.labels).length > 0 ? (
            <Line
              data={powerUsageData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                },
              }}
            />
          ) : (
            <p>No power usage data available for the current month.</p>
          )}
        </div>

        <div className="chart-widget">
          <h3>Cumulative Power Usage Per Day</h3>
          {Object.keys(cumulativePowerUsageData.labels).length > 0 ? (
            <Bar
              data={cumulativePowerUsageData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                },
              }}
            />
          ) : (
            <p>
              No cumulative power usage data available for the current month.
            </p>
          )}
        </div>
      </div>

      <div className="summary-widgets">
        <div className="summary-widget">
          <h3>Total Power Usage This Month (In Kilowatts)</h3>
          <p className="metric-value">
            {dashboardData.totalPowerUsageThisMonth}
          </p>
        </div>

        <div className="summary-widget">
          <h3>Average Voltage Reach</h3>
          <p className="metric-value">{dashboardData.averageVoltageReach} V</p>
        </div>

        <div className="summary-widget">
          <h3>Expected Power Limit for the month</h3>
          <p className="metric-value">
            {dashboardData.expectedPowerLimit} Kilowatts
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
