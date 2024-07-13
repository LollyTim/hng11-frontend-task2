"use server";

import axios from "axios";

const getProducts = async () => {
  try {
    const res = await axios.get(
      `https://api.timbu.cloud/products?organization_id=7e52f4501ad74befad3189aae99ceeb8&Appid=6DZIQZ5F7ELVPZF&Apikey=0eafd96074c94f3e9b60452dc465da8820240712181335080317`,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          credentials: "include",
        },
        withCredentials: true,
      }
    );
    return {
      products: res.data.items,
      message: "product retrieved successfully",
    };
  } catch (e: any) {
    return {
      message: e?.response?.data.message,
      status: e?.response?.status,
    };
  }
};

export default getProducts;
