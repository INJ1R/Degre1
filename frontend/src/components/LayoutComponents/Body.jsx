import React, { useEffect, useState, useRef } from "react";
import { getData } from "../../utils/requests.js";
import { ItemsGroup } from "../ItemsGroup/ItemsGroup.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavGen } from "../NavGen.jsx";

export const BodyComponent = () => {
  const [windowSize, setWindowSize] = useState(innerWidth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowSize(innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const knittedProductsRef = useRef(null);
  const ceramicsRef = useRef(null);
  const jewelryRef = useRef(null);
  const decorRef = useRef(null);
  const textilesRef = useRef(null);
  const soapRef = useRef(null);
  const woodenProductsRef = useRef(null);

  const navLinks = [
    { name: "Вязанные изделия", icon: "/nav/knitted stuff.jpg", ref: knittedProductsRef },
    { name: "Керамика и гончарные изделия", icon: "/nav/ceramic.jpg", ref: ceramicsRef },
    { name: "Украшения ручной работы", icon: "/nav/jewelry.jpg", ref: jewelryRef },
    { name: "Декор для дома", icon: "/nav/decoration.jpg", ref: decorRef },
    { name: "Текстиль и вышивка", icon: "/nav/textile.jpg", ref: textilesRef },
    { name: "Мыло и косметика ручной работы", icon: "/nav/soup.jpg", ref: soapRef },
    { name: "Деревянные изделия", icon: "/nav/wooden stuff.jpg", ref: woodenProductsRef }
  ];

  const [knittedProducts, setKnittedProducts] = useState([]);
  const [ceramics, setCeramics] = useState([]);
  const [jewelry, setJewelry] = useState([]);
  const [decor, setDecor] = useState([]);
  const [textiles, setTextiles] = useState([]);
  const [soap, setSoap] = useState([]);
  const [woodenProducts, setWoodenProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData();
        
        setKnittedProducts(data.knittedProductsData);
		console.log(knittedProducts)
        setCeramics(data.ceramicsData);
        setJewelry(data.jewelryData);
        setDecor(data.decorData);
        setTextiles(data.textilesData);
        setSoap(data.soapData);
        setWoodenProducts(data.woodenProductsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const linksCount = navLinks.length;
  const itemLength = 128;
  const containerWidth = windowSize >= 1300 ? 1300 : windowSize;
  const calcSpaceBetween = containerWidth / linksCount - itemLength;
  const spaceBetween = calcSpaceBetween > 12 ? calcSpaceBetween : 12;

  return (
    <div>
      <div className="max-w-[1300px] px-[15px] box-border mx-auto">
        <div className="flex flex-col gap-8 py-8">
          <div>
            <Swiper slidesPerView={"auto"} spaceBetween={spaceBetween}>
              {navLinks.map((link, index) => (
                <SwiperSlide key={index} style={{ width: "min-content" }}>
                  <NavGen name={link.name} icon={link.icon} ref={link.ref} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col gap-12">
            <ItemsGroup items={knittedProducts} title={"Вязанные изделия"} ref={knittedProductsRef} />
            <ItemsGroup items={ceramics} title={"Керамика и гончарные изделия"} ref={ceramicsRef} />
            <ItemsGroup items={jewelry} title={"Украшения ручной работы"} ref={jewelryRef} />
            <ItemsGroup items={decor} title={"Декор для дома"} ref={decorRef} />
            <ItemsGroup items={textiles} title={"Текстиль и вышивка"} ref={textilesRef} />
            <ItemsGroup items={soap} title={"Мыло и косметика ручной работы"} ref={soapRef} />
            <ItemsGroup items={woodenProducts} title={"Деревянные изделия"} ref={woodenProductsRef} />
          </div>
        </div>
      </div>
    </div>
  );
};