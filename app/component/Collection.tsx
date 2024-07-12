'use client';

import { client, urlFor } from "../lib/sanity";
import { Images } from "../lib/ImageArray";
import { motion, easeInOut } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductDataType{
  titleImage:any, 
  price:number,
  currentSlug:string,
  title:string


}


const Collection = () => {

  const [productData, setProductData] = useState<ProductDataType[]>([]);

  useEffect(() => {
    async function getData() {
      const query = `*[_type == 'product'] | order(_createdAt asc) {
        title,
        price,
        "currentSlug": slug.current,
        titleImage
      }`;
      const data = await client.fetch(query);
      console.log(data);
      setProductData(data)
    };
    getData();
  }, []);

  return (
    <div className="pl-5 flex gap-5">
      {productData.map((product, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05, transition: { ease: easeInOut } }}
          className="w-[240px] h-[340px]"
        >
          <Image
            className="-translate-y-1/2 transition-transform duration-300"
            src={urlFor(product.titleImage).url()}
            alt="image"
            width={240}
            height={340}
          />
          {/* <span>{product.title}</span> */}
        </motion.div>
      ))}
    </div>
  );
};

export default Collection;
