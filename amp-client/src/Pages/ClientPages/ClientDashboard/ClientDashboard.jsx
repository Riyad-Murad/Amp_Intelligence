import "./styles.css";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import axiosBaseUrl from "../../../Axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoad } from "../../../Redux/Slices/loadingSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend,
  Filler,
);

const ClientDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.id);
  const loading = useSelector((state) => state.loading.loadingState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDashboardData = async () => {
      dispatch(toggleLoad(true));
      try {
        const response = await axiosBaseUrl.get(
          `/clients/clientDashboardData/${userId}`
        );
        setDashboardData(response.data.data);
        dispatch(toggleLoad(false));
      } catch (error) {
        setError(error.message);
        dispatch(toggleLoad(false));
      }
    };

    fetchDashboardData();
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
    return <div>No dashboard data available.</div>;
  }

  const powerUsageData = {
    labels: Object.keys(dashboardData.powerUsagePerDay),
    datasets: [
      {
        label: "Power Usage (in Kilowatts)",
        data: Object.values(dashboardData.powerUsagePerDay),
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "#28a745", // Bootstrap success color
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
        data: Object.values(dashboardData.cumulativePowerUsage),
        fill: true,
        backgroundColor: "rgba(255, 193, 7, 0.6)", // Bootstrap warning color
        borderColor: "#ffc107",
        pointBackgroundColor: "#ffc107",
        pointBorderColor: "#fff",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
        title: {
          display: true,
          text: "Kilowatts",
          color: "#555",
        },
        grid: {
          borderColor: "#eee",
        },
        beginAtZero: true,
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
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Power Usage per Day",
                  },
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
            <Line
              data={cumulativePowerUsageData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: "Cumulative Power Usage Per Day",
                  },
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
