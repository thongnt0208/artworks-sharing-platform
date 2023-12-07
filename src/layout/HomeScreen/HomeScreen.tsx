import React from "react";
import { Button } from "primereact/button";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Tag from "../../components/Tag";
import CollectionCard from "../../components/CollectionCard";
import ServiceCard from "../../components/ServiceCard";

const ScreenHome: React.FC = () => {
  const collectionData = {
    id: 1,
    title: "Collection 1",
    description: "Collection 1 description",
  };

  const serviceData = {
    id: 1,
    serviceName: "Service 1",
    startingPrice: 1000,
    deliveryTime: 1,
    numberOfConcepts: 1,
  };
  return (
    <>
      <Header />
      <div style={{width: "80%", display: "flex", justifyContent: "space-between", margin: "50px"}}>
        <Tag label="#xinchao" color="red" onClick={() => {}} />
        <Tag label="#xinchao" color="red" onClick={() => {}} />
        <Tag label="#xinchao" color="red" onClick={() => {}} />
        <Tag label="#xinchao" color="red" onClick={() => {}} />
        <Tag label="#xinchao" color="red" onClick={() => {}} />
        <Tag label="#xinchao" color="red" onClick={() => {}} />
        <Tag label="#xinchao" color="red" onClick={() => {}} />
        <CollectionCard data={collectionData} />
        <ServiceCard data={serviceData} />
      </div>
      <Footer />
    </>
  );
};

export default ScreenHome;
