import React from "react";
import { Card } from "primereact/card";
import "primeflex/primeflex.css";
import waves from "assets/KYC/wave.svg";
import geo_area from "assets/KYC/geographical.png";
import { Divider } from "primereact/divider";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DonutChart, PieChart } from "components/GraphVisuals";
import { Tooltip } from "primereact/tooltip";
import "./KYC.css";

const CityDemographics = () => {
  return (
    <div className="flex align-items-center justify-content-center flex-column gap-4">
      <div className="flex align-items-center justify-content-center flex-row gap-4 w-full">
        {/* Geographical Overview Card */}
        <div
          className="w-full shadow-2 p-3 border-round h-auto bg-demographics"
          // style={{
          //   background: " linear-gradient(to left , #1F8297, #166C7D, #003940)",
          // }}
        >
          <div className="flex align-items-center justify-content-between flex-row w-full ">
            <h1 className="text-base m-0 p-0 text-white">
              Geographical Overview
            </h1>
            <i className="pi pi-map-marker text-white"></i>
          </div>
          <div className="flex align-items-center justify-content-center flex-row">
            <div className="flex align-items-center justify-content-center flex-column w-full">
              <div className="flex align-items-center justif-content-center flex-row w-full">
                <div
                  className="flex align-items-center justify-content-center flex-column p-2 m-2 h-6rem shadow-3 border-round w-full"
                  style={{ backgroundColor: "rgba(14, 116, 144, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-xl font-semibold text-white z-5">
                    35.56 sq.km
                  </h1>
                  <p className="p-1 m-0 text-white text-sm">
                    Geographical Area
                  </p>
                </div>
                <div
                  className="flex align-items-center justify-content-center  p-2 m-2 h-6rem shadow-3 border-round  flex-column p-2 m-2 h-5rem "
                  style={{ backgroundColor: "rgba(14, 116, 144, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl font-semibold text-white">
                    4
                  </h1>
                  <p className="p-1 m-0 text-white text-sm">Zones</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-2 m-2 h-6rem shadow-3 border-round  flex-column p-2 m-2 h-5rem "
                  style={{ backgroundColor: "rgba(14, 116, 144, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl font-semibold text-white">
                    50
                  </h1>
                  <p className="p-1 m-0 text-white text-sm">Wards</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-2 m-2 h-6rem shadow-3 border-round  flex-column p-2 m-2 h-5rem "
                  style={{ backgroundColor: "rgba(14, 116, 144, 0.2)" }}
                >
                  <i className="pi pi-info-circle text-white w-full text-right"></i>
                  <h1 className="p-1 m-0 text-2xl font-semibold text-white">
                    1
                  </h1>
                  <p className="p-1 m-0 text-white text-sm">Highways</p>
                </div>
              </div>
              <div className="flex align-items-center justif-content-center flex-row w-full">
                <div
                  className="flex align-items-center justify-content-center p-2 m-2 h-5rem shadow-3 border-round  flex-column  h-5rem w-full"
                  style={{ backgroundColor: "rgba(14, 116, 144, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-xl text-white">5</h1>
                  <p className="p-1 m-0 text-white text-sm">Water Bodies</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-2 m-2 h-5rem shadow-3 border-round  flex-column h-5rem"
                  style={{ backgroundColor: "rgba(14, 116, 144, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-xl text-white">1</h1>
                  <p className="p-1 m-0 text-white text-sm">Nallahs</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center  p-2 m-2 h-5rem shadow-3 border-round  flex-column  h-5rem w-full"
                  style={{ backgroundColor: "rgba(14, 116, 144, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-xl text-white">1311.6 Ha</h1>
                  <p className="p-1 m-0 text-white text-sm">
                    Parks & Open Spaces
                  </p>
                </div>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center m-2 h-5rem shadow-3 border-round  flex-column  h-12rem">
              <img src={geo_area} alt="area" className="h-13rem w-15rem" />
            </div>
          </div>
        </div>
        <div
          className="w-full shadow-2 p-3 border-round h-17rem"
          style={{
            background: " linear-gradient(to left , #1F8297, #166C7D, #003940)",
          }}
        >
          <div className="flex align-items-center justify-content-between flex-row ">
            <h1 className="text-base m-0 p-0 text-white">
              Population Insights
            </h1>
            <i className="pi pi-users text-white"></i>
          </div>
          <div className="flex align-items-center justify-content-between flex-row gap-2 ">
            {/* waves */}
            <div className="flex align-items-center justify-content-between flex-column my-2 bg-cyan-700 border-round">
              <div className="flex align-items-center justify-content-between flex-row bg-white border-round-top">
                <div className="flex align-items-center justify-content-center p-2 m-2 h-5rem   flex-column text-center">
                  <h1 className="p-1 m-0 text-lg text-cyan-800">3,93,209</h1>
                  <p className="p-0 m-0 text-600 text-xs">Census Population</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex align-items-center justify-content-center  p-2 m-2  flex-column  h-5rem text-center">
                  <h1 className="p-1 m-0 text-lg text-cyan-800">55,890</h1>
                  <p className="p-1 m-0 text-gray-600 text-xs">
                    Slum Population
                  </p>
                </div>
              </div>
              <img src={waves} className="p-0" alt="waves" />
              <div className="flex align-items-center justify-content-center flex-column mb-1">
                <h1 className="p-1 m-0 text-xl text-white">4,65,206</h1>
                <p className="p-1 m-0 text-white text-sm">Current Population</p>
              </div>
            </div>{" "}
            <div className="flex align-items-center justify-content-center p-2 m-2 h-12rem  gap-2  flex-row  h-5rem bg-white border-round w-12rem">
              <div style={{ width: "11rem" }}>
                <DonutChart
                  title={"Sex Ratio"}
                  labels={["Male", "Female"]}
                  series={[1000, 980]}
                  height={120}
                />
              </div>
            </div>
            {/* literacy-rate */}
            <div className="flex align-items-center justify-content-between flex-column ">
              <div className="flex align-items-center justify-content-center p-2 m-2 h-5rem flex-row  h-5rem bg-white border-round w-full gap-1">
                <div style={{ width: "4rem", height: "4rem" }}>
                  <CircularProgressbar value={73} text="73%" />
                </div>

                <p className="p-1 m-0 text-600 text-sm">Literacy Rate</p>
              </div>

              <div className="flex align-items-center justify-content-center p-2 m-2 h-6rem  flex-column  h-5rem bg-white border-round w-full">
                <h1 className="p-1 m-0 text-base text-cyan-800">
                  24.61 Deaths
                </h1>
                <p className="p-1 m-0 text-600 text-xs text-center">
                  Infant Mortality Rate
                  <br />
                  (per 100 birth)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex align-items-center justify-content-center flex-row gap-3 w-full">
        <div className="flex align-items-center justify-content-center flex-row  w-full  h-17rem">
          {/* Public Utilities */}
          <div
            className="w-full shadow-2 p-3 border-round"
            style={{
              background:
                " linear-gradient(to left , #1F8297, #166C7D, #003940)",
            }}
          >
            <div className="flex align-items-center justify-content-between flex-row ">
              <h1 className="text-base m-0 p-0 text-white">
                Civic Infrastructure
              </h1>
              <i className="pi pi-building-columns text-white"></i>
            </div>
            <div className="flex align-items-center justify-content-center flex-column gap-2 m-2">
              <div className="flex align-items-center justify-content-center flex-column bg-cyan-700 p-2 shadow-3 border-round w-full h-7rem">
                <i className="pi pi-info-circle text-white text-right w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl">1</h1>
                <p className="text-white p-1 m-0 text-base">
                  Seveage Treatment Plants
                </p>
              </div>
              <div className="flex align-items-center justify-content-center flex-column bg-cyan-700 p-2 shadow-3 border-round w-full h-7rem">
                <i className="pi pi-info-circle text-white text-right w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl">0</h1>
                <p className="text-white p-1 m-0 text-base">
                  Landfills & Dumpsites
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-items-center justify-content-center flex-row  w-full h-17rem">
          {/* Public Utilities */}
          <div
            className="w-full shadow-2 p-3 border-round"
            style={{
              background:
                " linear-gradient(to left , #1F8297, #166C7D, #003940)",
            }}
          >
            <div className="flex align-items-center justify-content-between flex-row ">
              <h1 className="text-base m-0 p-0 text-white">Public Utilities</h1>
              <i className="pi pi-building-columns text-white"></i>
            </div>
            <div className="flex align-items-center justify-content-center flex-row gap-2 m-2">
              <div className="flex align-items-center justify-content-center flex-column bg-cyan-700 p-2 shadow-3 border-round w-full h-7rem">
                <i className="pi pi-info-circle text-white text-right w-full hospitals cursor-pointer"></i>
                <h1 className="text-white p-1 m-0  text-2xl">188</h1>
                <p className="text-white p-1 m-0 text-sm">Hospitals</p>
                <Tooltip
                  target=".hospitals"
                  position="right"
                  style={{ backgroundColor: "white !importanat" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <p className="text-white text-base text-center ">
                    List of Top 4 Hospitals
                  </p>
                  <div className="flex align-items-start justify-content-start flex-row gap-4 surface-500  p-2">
                    <ul>
                      <li>
                        <i className="pi pi-forward mr-1"></i>
                        Government Hospital, Ayodhya
                      </li>
                      <li>
                        {" "}
                        <i className="pi pi-forward mr-1"></i>Anand
                        Multispeciality Hospital
                      </li>
                      <li>
                        {" "}
                        <i className="pi pi-forward mr-1"></i>Sewa Hospital and
                        Research Centre
                      </li>
                      <li>
                        <i className="pi pi-forward mr-1"></i>Chiranjeev
                        Hospital
                      </li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
              <div className="flex align-items-center justify-content-center flex-column bg-cyan-700 p-2 shadow-3 border-round w-full h-7rem">
                <i className="pi pi-info-circle text-white text-right education cursor-pointer w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl">252</h1>
                <p className="text-white p-1 m-0 text-sm">
                  Educational Facilities
                </p>
                <Tooltip
                  target=".education"
                  position="right"
                  style={{ backgroundColor: "white !importanat" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <div className="flex align-items-start justify-content-start flex-row gap-4 surface-500  p-2">
                    <ul>
                      <li>
                        <i className="pi pi-forward mr-1"></i>
                        Number of Schools : 236
                      </li>
                      <li>
                        {" "}
                        <i className="pi pi-forward mr-1"></i>Number of Colleges
                        : 16
                      </li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center flex-row gap-2 m-2">
              <div className="flex align-items-center justify-content-center flex-column bg-cyan-700 p-2 shadow-3 border-round w-full h-7rem">
                <i className="pi pi-info-circle text-white text-right hotels cursor-pointer w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl">17</h1>
                <p className="text-white p-1 m-0 text-sm">Hotels</p>
                <Tooltip
                  target=".hotels"
                  position="top"
                  style={{ backgroundColor: "white !importanat" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <p className="text-white text-base text-center ">
                    List of Top 4 Hospitals
                  </p>
                  <div className="flex align-items-start justify-content-start flex-row gap-4 surface-500  p-2">
                    <ul>
                      <li>
                        <i className="pi pi-forward mr-1"></i>
                        Hotel Saket, a Unit of Uttar Pradesh State Tourism
                        Development Corporation Ltd.
                      </li>
                      <li>
                        {" "}
                        <i className="pi pi-forward mr-1"></i>Rahi Yatri Niwas
                        Ayodhya, a Unit of Uttar Pradesh State Tourism
                        Development Corporation Ltd
                      </li>
                      <li>
                        {" "}
                        <i className="pi pi-forward mr-1"></i>Ramprastha Hotel
                        and Resorts
                      </li>
                      <li>
                        <i className="pi pi-forward mr-1"></i>A P Palace
                      </li>
                      <li>
                        <i className="pi pi-forward mr-1"></i>Tirupati Hotel
                      </li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
              <div className="flex align-items-center justify-content-center flex-column bg-cyan-700 p-2 shadow-3 border-round w-full h-7rem">
                <i className="pi pi-info-circle text-white text-right dharamshala cursor-pointer  w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl">70</h1>
                <p className="text-white p-1 m-0 text-sm">Dharamshalas</p>
                <Tooltip
                  target=".dharamshala"
                  position="top"
                  style={{ backgroundColor: "white !importanat" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <p className="text-white text-base text-center ">
                    List of Top 4 Dharamshalas
                  </p>
                  <div className="flex align-items-start justify-content-start flex-row gap-4 surface-500  p-2">
                    <ul>
                      <li>
                        <i className="pi pi-forward mr-1"></i>
                        Ayodhya Dharamshala
                      </li>
                      <li>
                        {" "}
                        <i className="pi pi-forward mr-1"></i>Anand Birla
                        Dharamshala
                      </li>
                      <li>
                        {" "}
                        <i className="pi pi-forward mr-1"></i>Hanumat Bhavan
                        Dharamshala
                      </li>
                      <li>
                        <i className="pi pi-forward mr-1"></i>Baranwal
                        Dharamshala
                      </li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
              <div className="flex align-items-center justify-content-center flex-column bg-cyan-700 p-2 shadow-3 border-round w-full h-7rem">
                <i className="pi pi-info-circle text-white text-right w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl">1</h1>
                <p className="text-white p-1 m-0 text-sm">A.P.M.C. Markets</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-items-center justify-content-center flex-row  w-full h-17rem">
          {/* Culture */}
          <div
            className="w-full shadow-2 p-3 border-round"
            style={{
              background:
                " linear-gradient(to left , #1F8297, #166C7D, #003940)",
            }}
          >
            <div className="flex align-items-center justify-content-between flex-row ">
              <h1 className="text-base m-0 p-0 text-white">
                Culture & Attractions
              </h1>
              <i className="pi pi-building-columns text-white"></i>
            </div>
            <div className="flex align-items-center justify-content-center flex-row gap-4 m-2">
              <div className="flex align-items-center justify-content-center flex-column gap-2 w-full">
                <div className="flex align-items-center justify-content-between bg-cyan-700 w-full flex-row border-round shadow-3 p-2 m-1 gap-8 h-4rem">
                  <div className="flex align-items-center justify-content-center gap-1">
                    <p className="p-1 m-0 text-white  text-lg">
                      Major Attractions
                    </p>
                    <i className="pi pi-info-circle attractions text-white" />
                  </div>
                  <h1 className="p-1 m-0 text-white  text-lg">9</h1>
                  <Tooltip
                    target=".attractions"
                    position="top"
                    style={{ backgroundColor: "white !importanat" }}
                    tooltipOptions={{
                      className: "hoverClass",
                      showDelay: 500,
                      hideDelay: 101300,
                    }}
                  >
                    <div className="flex align-items-start justify-content-start flex-row gap-4 surface-500  p-2">
                      <ul>
                        <li>
                          <i className="pi pi-forward mr-1"></i>
                          Ram Mandir
                        </li>
                        <li>
                          {" "}
                          <i className="pi pi-forward mr-1"></i>Gulab Bari
                        </li>
                        <li>
                          {" "}
                          <i className="pi pi-forward mr-1"></i>Bahu Begum ka
                          Maqbara
                        </li>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Guptar Ghat
                        </li>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Lakshman Kila
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Company Gardens
                        </li>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Hanuman Ghari
                        </li>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Kanak Bhawan
                        </li>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Nageshwarnath
                          Mandir
                        </li>
                      </ul>
                    </div>
                  </Tooltip>
                </div>
                <div className="flex align-items-center justify-content-between bg-cyan-700 w-full flex-row border-round shadow-3 p-2 m-1 gap-8 h-4rem">
                  <div className="flex align-items-center justify-content-center gap-1">
                    <p className="p-1 m-0 text-white  text-lg">
                      Fairs & Festivals
                    </p>
                    <i className="pi pi-info-circle fairs cursor-pointer text-white" />
                  </div>
                  <h1 className="p-1 m-0 text-white  text-lg">4</h1>
                  <Tooltip
                    target=".fairs"
                    position="top"
                    tooltipOptions={{
                      className: "hoverClass",
                      backgroundColor: "white",
                      showDelay: 500,
                      hideDelay: 101300,
                    }}
                    style={{ padding: "0" }}
                  >
                    <div className="flex align-items-start justify-content-start flex-row gap-4  surface-500  p-2">
                      <ul>
                        <li>
                          <i className="pi pi-forward mr-1"></i>
                          Ram Leela
                        </li>

                        <li>
                          <i className="pi pi-forward mr-1"></i>Ram Navmi Mela
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Sravan Jhula
                          Mela
                        </li>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Parikramas
                        </li>
                      </ul>
                    </div>
                  </Tooltip>
                </div>
                <div className="flex align-items-center justify-content-between bg-cyan-700 w-full flex-row border-round shadow-3 p-2 m-1 gap-8 h-4rem">
                  <div className="flex align-items-center justify-content-center gap-1">
                    <p className="p-1 m-0 text-white  text-lg">
                      Socio-Cultural Facilities
                    </p>
                    <i className="pi pi-info-circle text-white socio-culture cursor-pointer" />
                  </div>
                  <h1 className="p-1 m-0 text-white  text-lg">7</h1>
                  <Tooltip
                    target=".socio-culture"
                    position="top"
                    style={{ backgroundColor: "white !importanat" }}
                    tooltipOptions={{
                      className: "hoverClass",
                      showDelay: 500,
                      hideDelay: 101300,
                    }}
                  >
                    <div className="flex align-items-start justify-content-start flex-row gap-4 surface-500  p-2">
                      <ul>
                        <li>
                          <i className="pi pi-forward mr-1"></i>
                          Anganwari-Housing Area
                        </li>
                        <li>
                          {" "}
                          <i className="pi pi-forward mr-1"></i>Community room{" "}
                        </li>
                        <li>
                          {" "}
                          <i className="pi pi-forward mr-1"></i>Community hall
                          and library
                        </li>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Recreational
                          club
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Music, dance and
                          drama center
                        </li>
                        <li>
                          <i className="pi pi-forward mr-1"></i>Meditation and
                          spiritual center
                        </li>
                        <li>
                          <i className="pi pi-forward mr-1"></i> Old-age home
                        </li>
                      </ul>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDemographics;
