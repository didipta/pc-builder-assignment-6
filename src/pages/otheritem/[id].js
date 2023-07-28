import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { otheritem } from "../../redux/features/Pcbuild/pcbuildslice";

const itemsadd = ({ categories }) => {
  const dispatch = useDispatch();
  return (
    <div className="my-10 lg:mx-20">
      <h1 className="text-2xl font-extrabold text-blue-600">Items add</h1>
      <p className="text-xl font-extrabold text-gray-700 mb-10">
        {categories?.name}
      </p>
      <div>
        {categories?.products?.map((item) => (
          <div className="flex justify-between items-center border-b-2 border-gray-300 p-2">
            <div className="flex justify-between items-start gap-3">
              <img src={item.image} alt="" className="w-40" />
              <div>
                <p className="font-bold text-blue-500">{item.name}</p>
                <div>
                  <div className="text-sm text-gray-500">
                    {item?.key_features?.split(",").map((feature) => (
                      <div className="flex items-center my-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <div>{feature}</div>
                      </div>
                    ))}
                  </div>
                  <p className="font-extrabold">
                    {item?.price} || {item?.status}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Link
                href={`/pcbuilder`}
                className="btn bg-sky-600 text-white border-0"
                onClick={() => dispatch(otheritem(item))}
              >
                Add
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default itemsadd;
export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/product");
  const category = await res.json();

  const paths = category.data.map((category) => ({
    params: { id: category.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/category?Id=${params.id}`);

  const data = await res.json();
  return {
    props: {
      categories: data.data,
    },
  };
}
