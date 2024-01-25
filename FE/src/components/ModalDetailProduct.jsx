import React, { useEffect, useState } from "react";
import { Button, Input, Select, Space, Table, Tooltip, notification } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "antd";
import { findAllBrand, findAllSubCate, addProduct, findAllCategory } from "../api/ProductAPi";
import TextArea from "antd/es/input/TextArea";

export default function ModalAddProduct({ product, setProduct, isModalDetailOpen, handlerOKModalDetail, handlerCancelModalDetail }) {
    const [brand, setBrand] = useState([]);
    const [subCate, setSubCate] = useState([]);
    const [category, setCategory] = useState([]);

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    const onChangeBrand = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }
    const onChangeSubCate = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }
    useEffect(() => {
        const fetchDataBrand = async () => {
            try {
                const result = await findAllBrand();
                setBrand(result);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchDataSubCate = async () => {
            try {
                const result = await findAllSubCate();
                setSubCate(result);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchDataCategory = async () => {
            try {
                const result = await findAllCategory();
                setCategory(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchDataBrand();
        fetchDataSubCate();
        fetchDataCategory();
    }, []);

    return (
        <>
            <Modal
                title="Chi tiết sản phẩm"
                open={isModalDetailOpen}
                onOk={handlerOKModalDetail}
                onCancel={handlerCancelModalDetail}
                okText="Hoàn tất"
                cancelText="Hủy"
                width={700}
                okButtonProps={{ style: { backgroundColor: 'green', color: 'white' } }}
            >
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Product Name:</label>
                    <Input
                        className="border border-gray-300 rounded px-3 ml-2 py-1"
                        style={{ height: '33px', width: "80%" }}
                        name="productName"
                        value={product.productName}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Color:</label>
                    <Input
                        className="border border-gray-300 rounded px-3 ml-2 py-1"
                        style={{ height: '33px', width: "80%" }}
                        name="color"
                        value={product.color}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Quantity:</label>
                    <Input
                        className="border border-gray-300 rounded px-3 ml-2 py-1"
                        style={{ height: '33px', width: "80%" }}
                        name="quantity"
                        value={product.quantity}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Sell Price:</label>
                    <Input
                        className="border border-gray-300 rounded px-3 ml-2 py-1"
                        style={{ height: '33px', width: "80%" }}
                        name="sellPrice"
                        value={product.sellPrice}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Origin Price:</label>
                    <Input
                        className="border border-gray-300 rounded px-3 ml-2 py-1"
                        style={{ height: '33px', width: "80%" }}
                        name="originPrice"
                        value={product.originPrice}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Brand Name:</label>
                    <Select className="ml-2"
                        style={{ height: '33px', width: "80%" }} value={product.brandName}
                        name="brandName"
                    >
                        {
                            brand.map((brand) => (
                                <Select.Option key={brand.id} value={brand.brandName}>{brand.brandName}</Select.Option>
                            ))
                        }

                    </Select>

                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Category:</label>
                    <Select className="ml-2" style={{ height: '33px', width: "80%" }} value={product.category}
                        name="subCate"
                    >
                        {
                            category.map((cate) => (
                                <Select.Option key={cate.id} value={cate.cateName}>{cate.subCateName}</Select.Option>
                            ))
                        }
                    </Select>
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Subcategory:</label>
                    <Select className="ml-2" style={{ height: '33px', width: "80%" }} value={product.subCate}
                        name="subCate"
                    >
                        {
                            subCate.map((subCate) => (
                                <Select.Option key={subCate.id} value={subCate.name}>{subCate.subCateName}</Select.Option>
                            ))
                        }
                    </Select>
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Subcategory:</label>
                    <Select className="ml-2" style={{ height: '33px', width: "80%" }} value={product.status}
                        name="subCate"
                    >
                        <Select.Option value="Còn hàng">Còn hàng</Select.Option>
                        <Select.Option value="Hết hàng">Hết hàng</Select.Option>
                    </Select>
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Description:</label>
                    <TextArea className="ml-2" style={{ width: "80%" }} value={product.description}>

                    </TextArea>
                </div>
            </Modal>
        </>
    )
}