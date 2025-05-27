import React, { useEffect, useState, useRef } from "react";
import { getData } from "../../utils/requests.js";
import { ItemsGroup } from "../ItemsGroup/ItemsGroup.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavGen } from "../NavGen.jsx";

export const BodyComponent = () => {
  const [windowSize, setWindowSize] = useState(innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(innerWidth);
    });
  }, []);

  const knittedProductsRef = useRef(null);
  const ceramicsRef = useRef(null);
  const jewelryRef = useRef(null);
  const decorRef = useRef(null);
  const textilesRef = useRef(null);
  const soapRef = useRef(null);
  const woodenProductsRef = useRef(null);

  const navLinks = [
    {
      name: "Вязанные изделия",
      icon: "/products/knittedProducts/nav.jpg",
      ref: knittedProductsRef,
    },
    {
      name: "Керамика и гончарные изделия",
      icon: "/products/ceramics/nav.jpg",
      ref: ceramicsRef,
    },
    {
      name: "Украшения ручной работы",
      icon: "/products/jewelry/nav.jpg",
      ref: jewelryRef,
    },
    {
      name: "Декор для дома",
      icon: "/products/decor/nav.jpg",
      ref: decorRef,
    },
    {
      name: "Текстиль и вышивка",
      icon: "/products/textiles/nav.jpg",
      ref: textilesRef,
    },
    {
      name: "Мыло и косметика ручной работы",
      icon: "/products/soap/nav.jpg",
      ref: soapRef,
    },
    {
      name: "Деревянные изделия",
      icon: "/products/woodenProducts/nav.jpg",
      ref: woodenProductsRef,
    },
  ];

  const linksCoun = navLinks.length;
  const itemLength = 128;
  const containerWidth = windowSize >= 1300 ? 1300 : windowSize;
  const calcSpaceBetween = containerWidth / linksCoun - itemLength;
  const spaceBetween = calcSpaceBetween > 12 ? calcSpaceBetween : 12;

  const [knittedProducts, setKnittedProductsItem] = useState([]);
  const [ceramics, setCeramicsItem] = useState([]);
  const [jewelry, setJewelryItem] = useState([]);
  const [decor, setDecorItem] = useState([]);
  const [textiles, setTextilesItem] = useState([]);
  const [soap, setSoapItem] = useState([]);
  const [woodenProducts, setWoodenProductsItem] = useState([]);

  useEffect(() => {
    getData().then((e) => {
      setKnittedProductsItem(e.knittedProductsData);
      setCeramicsItem(e.ceramicsData);
      setJewelryItem(e.jewelryData);
      setDecorItem(e.decorData);
      setTextilesItem(e.textilesData);
      setSoapItem(e.soapData);
      setWoodenProductsItem(e.woodenProductsData);
    });
  }, []);

  return (
    <div>
      <div className="max-w-[1300px] px-[15px] box-border mx-auto">
        <div className="flex flex-col gap-8 py-8">
          <div>
            <Swiper slidesPerView={"auto"} spaceBetween={spaceBetween}>
              {navLinks.map((link, index) => (
                <SwiperSlide key={index} style={{ width: "min-content" }}>
                  <NavGen
                    name={link.name}
                    icon={link.icon}
                    ref={link.ref}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col gap-12">
            <ItemsGroup
              items={knittedProducts}
              title={"Вязанные изделия"}
              ref={knittedProductsRef}
            />
            <ItemsGroup
              items={ceramics}
              title={"Керамика и гончарные изделия"}
              ref={ceramicsRef}
            />
            <ItemsGroup
              items={jewelry}
              title={"Украшения ручной работы"}
              ref={jewelryRef}
            />
            <ItemsGroup 
              items={decor} 
              title={"Декор для дома"} 
              ref={decorRef} 
            />
            <ItemsGroup
              items={textiles}
              title={"Текстиль и вышивка"}
              ref={textilesRef}
            />
            <ItemsGroup
              items={soap}
              title={"Мыло и косметика ручной работы"}
              ref={soapRef}
            />
            <ItemsGroup
              items={woodenProducts}
              title={"Деревянные изделия"}
              ref={woodenProductsRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};