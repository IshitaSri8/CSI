import React from "react";
import "primeflex/primeflex.css";
import waves from "assets/KYC/wave.svg";
import geo_area from "assets/KYC/geographical.png";
import { Divider } from "primereact/divider";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Doughnut } from "Layout/GraphVisuals";
import { Tooltip } from "primereact/tooltip";
import "./KYC.css";
import { Building2, PartyPopper, Trash } from "lucide-react";

const CityDemographics = () => {
  return (
    <div className="flex flex-column gap-2">
      <div className="flex align-items-center justify-content-center gap-4 w-full">
        {/* Geographical Overview Card */}
        <div
          className="w-full shadow-2 p-3 border-round-2xl h-auto bg-demographics"
          // style={{
          //   background: " linear-gradient(to left , #1F8297, #166C7D, #003940)",
          // }}
        >
          <div className="flex align-items-center justify-content-between w-full ">
            <h1 className="m-0 p-0 text-white font-semibold">Geographical Overview</h1>
            <i className="pi pi-map-marker text-white"></i>
          </div>
          <div className="flex align-items-center justify-content-center gap-3 p-2">
            <div className="flex align-items-center justify-content-center flex-column w-full gap-3">
              <div className="flex align-items-center justify-content-center w-full gap-2">
                <div
                  className="flex align-items-center justify-content-center flex-column p-3 border-round w-full "
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  
                >
                  <h1 className="p-1 m-0 text-xl font-semibold text-white">
                    133.67 <span className="text-sm">sq.km</span>
                  </h1>
                  <p className="p-1 m-0 text-white text-sm">
                    Geographical Area
                  </p>
                </div>

                <div
                  className="flex align-items-center justify-content-center border-round flex-column p-3"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl font-semibold text-white">
                    11
                  </h1>
                  <p className="p-1 m-0 text-white text-sm">Blocks</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-3 border-round flex-column"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl font-semibold text-white">
                    60
                  </h1>
                  <p className="p-1 m-0 text-white text-sm">Wards</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-2 border-round flex-column"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <i className="pi pi-info-circle text-white w-full text-right highway text-xs"></i>
                  <h1 className="p-1 m-0 text-2xl font-semibold text-white">
                    1
                  </h1>
                  <p className="p-1 m-0 text-white text-sm">Highways</p>
                  <Tooltip
                    target=".highway"
                    position="right"
                    style={{ backgroundColor: "white !important" }}
                    tooltipOptions={{
                      className: "hoverClass",
                      showDelay: 500,
                      hideDelay: 101300,
                    }}
                  >
                    <div className="flex align-items-start justify-content-start gap-4 p-2">
                      <ul>
                        <li>Lucknow Ayodhya Expressway (252 kms)</li>
                      </ul>
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="flex align-items-center justif-content-center w-full gap-2">
                <div
                  className="flex align-items-center justify-content-center p-3 border-round flex-column w-full"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-xl text-white">5</h1>
                  <p className="p-1 m-0 text-white text-sm">Water Bodies</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-3 border-round flex-column"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-xl text-white">1</h1>
                  <p className="p-1 m-0 text-white text-sm">Nallahs</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-3 border-round flex-column w-full"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-xl text-white">
                    163.31 <span className="text-sm">ha</span>{" "}
                  </h1>
                  <p className="p-1 m-0 text-white text-xs">
                    Parks & Open Spaces
                  </p>
                </div>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center border-round-xl">
              <img src={geo_area} alt="area" className="h-12rem w-14rem" />
            </div>
          </div>
        </div>
        {/* Population Insights */}
        <div
          className="w-full shadow-2 p-3 border-round-2xl"
          style={{
            background: "linear-gradient(to left , #1F8297, #166C7D, #003940)",
          }}
        >
          <div className="flex align-items-center justify-content-between">
            <h1 className="m-0 p-0 text-white font-semibold">Population Insights</h1>
            <i className="pi pi-users text-white"></i>
          </div>
          <div className="flex align-items-center justify-content-center gap-5 p-2">
            {/* waves */}
            <div
              className="flex align-items-center justify-content-between flex-column bg-theme my-2 border-round"
             // style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <div className="flex align-items-center justify-content-between bg-white border-round-top">
                <div className="flex align-items-center justify-content-center p-3 flex-column text-center">
                  <h1 className="p-1 m-0 text-xl text-theme">2,21,118</h1>
                  <p className="p-0 m-0 text-600 text-xs">Census Population</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex align-items-center justify-content-center p-3 flex-column text-center">
                  <h1 className="p-1 m-0 text-xl text-theme">25,669</h1>
                  <p className="p-1 m-0 text-gray-600 text-xs">
                    Slum Population
                  </p>
                </div>
              </div>
              {/* <img src={waves} className="p-0" alt="waves" /> */}
              <div className="flex align-items-center justify-content-center flex-column p-3">
                <h1 className="p-1 m-0 text-xl text-white">4,65,206</h1>
                <p className="p-1 m-0 text-white text-sm">Current Population</p>
              </div>
            </div>{" "}
            <div className="flex w-full bg-white align-items-center justify-content-center py-3 border-round">
              <Doughnut
                title={"Sex Ratio- 980"}
                labels={["Male", "Female"]}
                series={[1000, 980]}
                height={120}
                //bgColor="transparent"
              />
            </div>
            {/* literacy-rate */}
            <div className="flex align-items-center justify-content-center flex-column gap-2">
              <div className="flex align-items-center justify-content-center p-2 bg-white border-round w-full gap-1">
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <CircularProgressbar
                    value={73}
                    text="73%"
                    className="m-0 p-0 "
                  />
                </div>
                <p className="p-0 m-0 text-600 text-xs text-center">
                  Literacy Rate
                </p>
              </div>

              <div className="flex align-items-center justify-content-center p-3 flex-column bg-white border-round w-full">
                <h1 className="p-0 m-0 text-lg text-theme">980/sq.km</h1>
                <p className="p-1 m-0 text-600 text-sm text-center">
                  Population Density
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Civic Infrastructure */}
      <div className="flex align-items-center justify-content-center gap-3 w-full">
        <div className="flex align-items-center justify-content-center w-full">
          <div
            className="w-full shadow-2 p-3 border-round-2xl"
            style={{
              background:
                " linear-gradient(to left , #1F8297, #166C7D, #003940)",
            }}
          >
            <div className="flex align-items-center justify-content-between ">
              <h1 className="m-0 p-0 text-white font-semibold">Civic Infrastructure</h1>
              <Trash size={15} className="text-white" />
            </div>
            <div className="flex align-items-center justify-content-center flex-column gap-3 m-2">
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right w-full text-xs cursor-pointer sewage"></i>
                <h1 className="text-white p-1 m-0 text-2xl">1</h1>
                <p className="text-white p-1 m-0">Sewage Treatment Plants</p>
                <Tooltip
                  target=".sewage"
                  position="right"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <div className="flex align-items-start justify-content-start gap-4 p-2">
                    <ul>
                      <li>Capacity : 12MLD</li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right w-full text-xs"></i>
                <h1 className="text-white p-1 m-0 text-2xl">0</h1>
                <p className="text-white p-1 m-0">Landfills & Dumpsites</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-items-center justify-content-center w-full">
          {/* Public Utilities */}
          <div
            className="w-full shadow-2 p-4 border-round-2xl"
            style={{
              background:
                " linear-gradient(to left , #1F8297, #166C7D, #003940)",
            }}
          >
            <div className="flex align-items-center justify-content-between ">
              <h1 className="m-0 p-0 text-white font-semibold">Public Utilities</h1>
              <Building2 className="text-white" size={15} />
            </div>
            <div className="flex align-items-center justify-content-center gap-2 m-2">
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right w-full hospitals cursor-pointer text-xs"></i>
                <h1 className="text-white p-1 m-0 text-2xl">188</h1>
                <p className="text-white p-1 m-0 text-sm">Hospitals</p>
                <Tooltip target=".hospitals" position="right">
                  <p className="text-left font-bold m-0 p-0">
                    List of Top 4 Hospitals
                  </p>
                  <div className="flex align-items-start justify-content-start gap-4">
                    <ul>
                      <li>Government Hospital, Ayodhya</li>
                      <li> Anand Multispeciality Hospital</li>
                      <li> Sewa Hospital and Research Centre</li>
                      <li>Chiranjeev Hospital</li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right education cursor-pointer text-xs w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl">252</h1>
                <p className="text-white p-1 m-0 text-sm">
                  Educational Facilities
                </p>
                <Tooltip target=".education" position="right">
                  <div className="flex align-items-center justify-content-center gap-4  p-2 flex-row">
                    <p className="m-0 p-0">Schools : 236</p>
                    <Divider layout="vertical" className="m-0" />
                    <p className="m-0 p-0"> Colleges : 16</p>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center gap-2 m-2">
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right hotels cursor-pointer text-xs w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl">17</h1>
                <p className="text-white p-1 m-0 text-sm">Hotels</p>
                <Tooltip
                  target=".hotels"
                  position="top"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <p className="text-left font-bold p-0 m-0">
                    List of Top 5 Hotels{" "}
                  </p>
                  <div className="flex align-items-start justify-content-start gap-4  p-2">
                    <ul>
                      <li>
                        Hotel Saket, a Unit of Uttar Pradesh State Tourism
                        Development Corporation Ltd.
                      </li>
                      <li>
                        {" "}
                        Rahi Yatri Niwas Ayodhya, a Unit of Uttar Pradesh State
                        Tourism Development Corporation Ltd
                      </li>
                      <li>Ramprastha Hotel and Resorts</li>
                      <li>A P Palace</li>
                      <li>Tirupati Hotel</li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right dharamshala cursor-pointer text-xs w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl">70</h1>
                <p className="text-white p-1 m-0 text-sm">Dharamshalas</p>
                <Tooltip
                  target=".dharamshala"
                  position="top"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <p className="text-left font-bold p-0 m-0 ">
                    List of Top 4 Dharamshalas
                  </p>
                  <div className="flex align-items-start justify-content-start gap-4  p-2">
                    <ul>
                      <li>Ayodhya Dharamshala</li>
                      <li> Anand Birla Dharamshala</li>
                      <li> Hanumat Bhavan Dharamshala</li>
                      <li>Baranwal Dharamshala</li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right w-full text-xs market"></i>
                <h1 className="text-white p-1 m-0 text-2xl">1</h1>
                <p className="text-white p-1 m-0 text-sm">A.P.M.C. Markets</p>
                <Tooltip
                  target=".market"
                  position="top"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <div className="flex align-items-start justify-content-start gap-4  p-2">
                    <ul>
                      <li>Area: 39.30 acre</li>
                    </ul>
                    <Divider layout="vertical" className="m-0" />
                    <ul>
                      <li>Quantity (in Quintal): 2616387</li>
                    </ul>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-items-center justify-content-center w-full">
          {/* Culture */}
          <div
            className="w-full shadow-2 p-4 border-round-2xl"
            style={{
              background:
                " linear-gradient(to left , #1F8297, #166C7D, #003940)",
            }}
          >
            <div className="flex align-items-center justify-content-between ">
              <h1 className="m-0 p-0 text-white font-semibold">Culture & Attractions</h1>
              <PartyPopper size={15} className="text-white" />
            </div>
            <div className="flex align-items-center justify-content-center m-2">
              <div className="flex align-items-center justify-content-center flex-column gap-3 w-full">
                <div
                  className="flex align-items-center justify-content-between w-full border-round p-2 m-1 gap-8"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <div className="flex align-items-center justify-content-center gap-1">
                    <p className="p-1 m-0 text-white text-lg">
                      Major Attractions
                    </p>
                    <i className="pi pi-info-circle attractions text-white text-xs" />
                  </div>
                  <h1 className="p-1 m-0 text-white text-lg">9</h1>
                  <Tooltip
                    target=".attractions"
                    position="top"
                    style={{ backgroundColor: "white !important" }}
                    tooltipOptions={{
                      className: "hoverClass",
                      showDelay: 500,
                      hideDelay: 101300,
                    }}
                  >
                    <div className="flex align-items-start justify-content-start gap-4   p-2">
                      <ul>
                        <li>Ram Mandir</li>
                        <li> Gulab Bari</li>
                        <li> Bahu Begum ka Maqbara</li>
                        <li>Guptar Ghat</li>
                        <li>Lakshman Kila</li>
                      </ul>
                      <Divider layout="vertical" className="h-12rem" />
                      <ul>
                        <li>Company Gardens</li>
                        <li>Hanuman Ghari</li>
                        <li>Kanak Bhawan</li>
                        <li>Nageshwarnath Mandir</li>
                      </ul>
                    </div>
                  </Tooltip>
                </div>
                <div
                  className="flex align-items-center justify-content-between w-full border-round p-2 m-1 gap-8"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <div className="flex align-items-center justify-content-center gap-1">
                    <p className="p-1 m-0 text-white text-lg">
                      Fairs & Festivals
                    </p>
                    <i className="pi pi-info-circle fairs cursor-pointer text-xs text-white text-xs" />
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
                    <div className="flex align-items-start justify-content-start gap-4  p-2">
                      <ul>
                        <li>Ram Leela</li>

                        <li>Ram Navmi Mela</li>
                      </ul>
                      <Divider layout="vertical" className="m-0 h-5rem" />
                      <ul>
                        <li>Sravan Jhula Mela</li>
                        <li>Parikramas</li>
                      </ul>
                    </div>
                  </Tooltip>
                </div>
                <div
                  className="flex align-items-center justify-content-between w-full border-round p-2 m-1 gap-8"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <div className="flex align-items-center justify-content-center gap-1">
                    <p className="p-1 m-0 text-white  text-lg">
                      Socio-Cultural Facilities
                    </p>
                    <i className="pi pi-info-circle text-white socio-culture cursor-pointer text-xs text-xs" />
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
                    <div className="flex align-items-start justify-content-start gap-4   p-2">
                      <ul>
                        <li>Anganwari-Housing Area</li>
                        <li> Community room </li>
                        <li> Community hall and library</li>
                        <li>Recreational club</li>
                      </ul>
                      <Divider layout="vertical" className="h-10rem m-0" />
                      <ul>
                        <li>Music, dance and drama center</li>
                        <li>Meditation and spiritual center</li>
                        <li>Old-age home</li>
                      </ul>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
      *These numbers are subject to variation.
      </p>
    </div>
  );
};

export default CityDemographics;
