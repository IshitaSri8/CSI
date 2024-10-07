import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { StyleClass } from "primereact/styleclass";
import { Ripple } from "primereact/ripple";
import { Link } from "react-router-dom";
import Arahas from "../assets/arahas_logo.png";
import { Button } from "primereact/button";

const CitySidebar = () => {
    const [visible, setVisible] = useState(false);
    const [activeSections, setActiveSections] = useState({
        environment: false,
        knowYourCity: false,
        cityReportCard: false,
        social: false,
    });

    const toggleSection = (section) => {
        setActiveSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <>
            <Button icon="pi pi-bars" onClick={() => setVisible(true)} />

            <Sidebar 
            visible={visible} 
            onHide={() => setVisible(false)} 
            position="left"
            header={
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <img src={Arahas} alt="Logo" className="mr-auto w-6" />
                </div>
            }
            >
            <div style={{ backgroundColor: '#1F8297', padding: '1rem', height: '100vh' }}>
                <ul className="list-none p-0 m-0">
                    {/* Know Your City Section */}
                    <li>
                        <a onClick={() => toggleSection("knowYourCity")} 
                         style={{ backgroundColor: '#1F8297'}} 
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-compass mr-2 "></i>
                            <span className="font-medium ">Know Your City</span>
                            <i className={`pi pi-chevron-${activeSections.knowYourCity ? "up" : "down"} ml-auto `}></i>
                            <Ripple />
                        </a>
                        {activeSections.knowYourCity && (
                            <ul className="list-none py-0 pl-3 pr-0 m-0 mt-2">
                                <li>
                                    <Link to="/kyc" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-info-circle mr-2"></i>
                                        <span className="font-medium">City Demographics</span>
                                        <Ripple />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/kyc" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-chart-line mr-2"></i>
                                        <span className="font-medium">City Progress</span>
                                        <Ripple />
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* City Report Card Section */}
                    <li>
                        <a onClick={() => toggleSection("cityReportCard")} 
                         style={{ backgroundColor: '#1F8297'}} 
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-file mr-2 "></i>
                            <span className="font-medium ">City Report Card</span>
                            <i className={`pi pi-chevron-${activeSections.cityReportCard ? "up" : "down"} ml-auto `}></i>
                            <Ripple />
                        </a>
                        {activeSections.cityReportCard && (
                            <ul className="list-none py-0 pl-3 pr-0 m-0 mt-2">
                                <li>
                                    <Link to="/reportcard" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-table mr-2"></i>
                                        <span className="font-medium">View Report</span>
                                        <Ripple />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/reportcard" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-pencil mr-2"></i>
                                        <span className="font-medium">Edit Report</span>
                                        <Ripple />
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    {/* Environment Section */}
                    <li>
                        <a onClick={() => toggleSection("environment")} 
                        style={{ backgroundColor: '#1F8297'}} 
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-globe mr-2 "></i>
                            <span className="font-medium ">Environment</span>
                            <i className={`pi pi-chevron-${activeSections.environment ? "up" : "down"} ml-auto `}></i>
                            <Ripple />
                        </a>
                        {activeSections.environment && (
                            <ul className="list-none py-0 pl-3 pr-0 m-0 mt-2">
                                <li>
                                    <Link to="/aqi" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-cloud mr-2"></i>
                                        <span className="font-medium">AQI</span>
                                        <Ripple />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/temperature" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-sun mr-2"></i>
                                        <span className="font-medium">Temperature</span>
                                        <Ripple />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/land" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-map mr-2"></i>
                                        <span className="font-medium">Land</span>
                                        <Ripple />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/rain" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-cloud mr-2"></i>
                                        <span className="font-medium">Rain</span>
                                        <Ripple />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/waste" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-trash mr-2"></i>
                                        <span className="font-medium">Waste</span>
                                        <Ripple />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/water" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-sparkles mr-2"></i>
                                        <span className="font-medium">Water</span>
                                        <Ripple />
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>

                     {/* Social Section */}
                     <li>
                        <a onClick={() => toggleSection("social")} 
                         style={{ backgroundColor: '#1F8297'}} 
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                            <i className="pi pi-file mr-2 "></i>
                            <span className="font-medium ">Social</span>
                            <i className={`pi pi-chevron-${activeSections.social ? "up" : "down"} ml-auto `}></i>
                            <Ripple />
                        </a>
                        {activeSections.social && (
                            <ul className="list-none py-0 pl-3 pr-0 m-0 mt-2">
                                <li>
                                    <Link to="/transport" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-table mr-2"></i>
                                        <span className="font-medium">Transport</span>
                                        <Ripple />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/healthcare" 
                                    style={{ backgroundColor: '#69ABB9'}} 
                                    className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                        <i className="pi pi-pencil mr-2"></i>
                                        <span className="font-medium">Healthcare</span>
                                        <Ripple />
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
                </div>
            </Sidebar>
        </>
    );
};

export default CitySidebar;
