import React, { useState } from "react";
import "primeflex/primeflex.css";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import ayodhya from "assets/AYODHYA.png";
import buss from "assets/buss.svg";
import rickshaw from "assets/rickshaw.svg";
import bike from "assets/bike.svg";
import { Divider } from "primereact/divider";
import "./BusRoutes.css";

const BusRoutes = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const routes = [
    {
      label: "Rikabgunj to Niyawa Road",
      value: "Rikabgunj to Niyawa Road",
      image: ayodhya,
      details: {
        frequency: "Every 30 minutes",
        coverageArea: "5 km",
        peakHours: "8 AM - 9 AM",
        nonPeakHours: "1 PM - 2 PM",
        Peak_threeWheeler: "40%",
        Peak_twoWheeler: "30%",
        Peak_bus: "30%",
        NonPeak__threeWheeler: "40%",
        NonPeak_twoWheeler: "10%",
        NonPeak_bus: "50%",
      },
    },
    {
      label: "Niyawa to Ayodhya",
      value: "Niyawa to Ayodhya",
      image: ayodhya,
      details: {
        frequency: "Every 45 minutes",
        coverageArea: "7 km",
        peakHours: "8 AM - 9 AM",
        nonPeakHours: "1 PM - 2 PM",
        Peak_threeWheeler: "40%",
        Peak_twoWheeler: "30%",
        Peak_bus: "30%",
        NonPeak__threeWheeler: "40%",
        NonPeak_twoWheeler: "10%",
        NonPeak_bus: "50%",
      },
    },
    {
      label: "Ram ki Padhi to Hanuman Gadhi",
      value: "Ram ki Padhi to Hanuman Gadhi",
      image: ayodhya,
      details: {
        frequency: "Every 20 minutes",
        coverageArea: "4 km",
        peakHours: "8 AM - 9 AM",
        nonPeakHours: "1 PM - 2 PM",
        Peak_threeWheeler: "40%",
        Peak_twoWheeler: "30%",
        Peak_bus: "30%",
        NonPeak__threeWheeler: "40%",
        NonPeak_twoWheeler: "10%",
        NonPeak_bus: "50%",
      },
    },
    {
      label: "Fatehgunj to Chauk (Chauk Marg)",
      value: "Fatehgunj to Chauk (Chauk Marg)",
      image: ayodhya,
      details: {
        frequency: "Every 25 minutes",
        coverageArea: "6 km",
        peakHours: "8 AM - 9 AM",
        nonPeakHours: "1 PM - 2 PM",
        Peak_threeWheeler: "40%",
        Peak_twoWheeler: "30%",
        Peak_bus: "30%",
        NonPeak__threeWheeler: "40%",
        NonPeak_twoWheeler: "10%",
        NonPeak_bus: "50%",
      },
    },
    {
      label: "SahadatGunj bypass to BUS Adda (CIVIL LINES)",
      value: "SahadatGunj bypass to BUS Adda (CIVIL LINES)",
      image: ayodhya,
      details: {
        frequency: "Every 40 minutes",
        coverageArea: "8 km",
        peakHours: "8 AM - 9 AM",
        nonPeakHours: "1 PM - 2 PM",
        Peak_threeWheeler: "40%",
        Peak_twoWheeler: "30%",
        Peak_bus: "30%",
        NonPeak__threeWheeler: "40%",
        NonPeak_twoWheeler: "10%",
        NonPeak_bus: "50%",
      },
    },
    {
      label: "Benigunj to Hanumangadhi",
      value: "Benigunj to Hanumangadhi",
      image: ayodhya,
      details: {
        frequency: "Every 15 minutes",
        coverageArea: "3 km",
        peakHours: "8 AM - 9 AM",
        nonPeakHours: "1 PM - 2 PM",
        Peak_threeWheeler: "40%",
        Peak_twoWheeler: "30%",
        Peak_bus: "30%",
        NonPeak__threeWheeler: "40%",
        NonPeak_twoWheeler: "10%",
        NonPeak_bus: "50%",
      },
    },
    {
      label: "Maqabara Road to Naka Chungi",
      value: "Maqabara Road to Naka Chungi",
      image: ayodhya,
      details: {
        frequency: "Every 35 minutes",
        coverageArea: "5 km",
        peakHours: "8 AM - 9 AM",
        nonPeakHours: "1 PM - 2 PM",
        Peak_threeWheeler: "40%",
        Peak_twoWheeler: "30%",
        Peak_bus: "30%",
        NonPeak__threeWheeler: "40%",
        NonPeak_twoWheeler: "10%",
        NonPeak_bus: "50%",
      },
    },
  ];

  const handleRouteChange = (e) => {
    setSelectedRoute(e.value);
    setDialogVisible(true);
  };

  return (
    <div
      className="flex flex-column bg-white border-round p-3 gap-3 justify-content-between"
      style={{ flex: "40%" }}
    >
      <div className="flex justify-content-between align-items-center">
        <p className="card-title p-0 m-0">Bus Routes and Traffic analysis</p>

        <Dropdown
          value={selectedRoute}
          options={routes}
          onChange={handleRouteChange}
          placeholder="Select a Route"
          panelClassName="custom-dropdown-panel"
          style={{ width: "150px" }}
          //   className="w-full"
        />

        <Dialog
          //   header="Route Details"
          visible={dialogVisible}
          style={{ width: "50vw" }}
          modal
          onHide={() => setDialogVisible(false)}
        >
          <p className="card-text p-0 m-0">Bus Routes and Traffic analysis</p>
          {selectedRoute && (
            // <Card title={selectedRoute}>
            <div className="relative flex flex-column bg-white border-round gap-2">
              <img
                src={
                  routes.find((route) => route.value === selectedRoute).image
                }
                alt={selectedRoute}
                className="w-full"
              />
              <div
                className="flex flex-column gap-2 absolute w-3/4 border-round p-4 bg-white"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  //   backgroundColor: "rgba(255, 255, 255, 0.8)",
                  //   padding: "1rem",
                  //   borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex flex-column">
                  <p className="card-text text-sm p-0 m-0">Route</p>
                  <p className="text-primary1 font-medium p-0 m-0">
                    {" "}
                    {selectedRoute}
                  </p>
                </div>
                <div className="flex justify-content-between">
                  <div className="flex flex-column">
                    <p className="card-text text-sm p-0 m-0">Frequency</p>
                    <p className="text-primary1 font-medium p-0 m-0">
                      {" "}
                      {
                        routes.find((route) => route.value === selectedRoute)
                          .details.frequency
                      }
                    </p>
                  </div>
                  <div className="flex flex-column">
                    <p className="card-text text-sm p-0 m-0">Coverage Area</p>
                    <p className="text-primary1 font-medium p-0 m-0">
                      {
                        routes.find((route) => route.value === selectedRoute)
                          .details.coverageArea
                      }
                    </p>
                  </div>
                </div>
                <p className="card-text text-sm p-0 m-0">Traffic Analysis</p>
                <div
                  className="flex justify-content-around border-round p-2"
                  style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="flex flex-column gap-2">
                    <div className="flex flex-column">
                      <p className="card-text text-sm p-0 m-0">Peak Hours</p>
                      <p className="text-primary1 font-medium p-0 m-0">
                        {
                          routes.find((route) => route.value === selectedRoute)
                            .details.peakHours
                        }
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <img src={rickshaw} alt="rickshaw" className="w-2rem" />
                      <div className="flex flex-column">
                        <p className="card-text text-sm p-0 m-0">3-Wheeler</p>
                        <p className="text-primary1 font-medium p-0 m-0">
                          {
                            routes.find(
                              (route) => route.value === selectedRoute
                            ).details.Peak_threeWheeler
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <img src={bike} alt="bike" className="w-2rem" />
                      <div className="flex flex-column">
                        <p className="card-text text-sm p-0 m-0">2-Wheeler</p>
                        <p className="text-primary1 font-medium p-0 m-0">
                          {
                            routes.find(
                              (route) => route.value === selectedRoute
                            ).details.Peak_twoWheeler
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <img src={buss} alt="bus" className="w-2rem" />
                      <div className="flex flex-column">
                        <p className="card-text text-sm p-0 m-0">Bus</p>
                        <p className="text-primary1 font-medium p-0 m-0">
                          {
                            routes.find(
                              (route) => route.value === selectedRoute
                            ).details.Peak_bus
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column gap-2">
                    <div className="flex flex-column">
                      <p className="card-text text-sm p-0 m-0">
                        Non-Peak Hours
                      </p>
                      <p className="text-primary1 font-medium p-0 m-0">
                        {
                          routes.find((route) => route.value === selectedRoute)
                            .details.nonPeakHours
                        }
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <img src={rickshaw} alt="rickshaw" className="w-2rem" />
                      <div className="flex flex-column">
                        <p className="card-text text-sm p-0 m-0">3-Wheeler</p>
                        <p className="text-primary1 font-medium p-0 m-0">
                          {
                            routes.find(
                              (route) => route.value === selectedRoute
                            ).details.NonPeak__threeWheeler
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <img src={bike} alt="bike" className="w-2rem" />
                      <div className="flex flex-column">
                        <p className="card-text text-sm p-0 m-0">2-Wheeler</p>
                        <p className="text-primary1 font-medium p-0 m-0">
                          {
                            routes.find(
                              (route) => route.value === selectedRoute
                            ).details.NonPeak_twoWheeler
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <img src={buss} alt="bus" className="w-2rem" />
                      <div className="flex flex-column">
                        <p className="card-text text-sm p-0 m-0">Bus</p>
                        <p className="text-primary1 font-medium p-0 m-0">
                          {
                            routes.find(
                              (route) => route.value === selectedRoute
                            ).details.NonPeak_bus
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-column p-2 border-round"
                style={{ backgroundColor: "#F9C84980" }}
              >
                <p className="card-text p-0 m-0">Insights:</p>
                <p className="text-primary1 font-medium p-0 m-0">
                  Lorem ipsum some text will come here explaining what needs to
                  be done for improvement of transport facilities in the city.{" "}
                </p>
              </div>
            </div>
          )}
        </Dialog>
      </div>
      <img src={ayodhya} alt="ayodhya" className="w-30rem" />
    </div>
  );
};

export default BusRoutes;
