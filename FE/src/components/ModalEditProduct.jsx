import React, { useEffect, useState } from "react";
import { Button, Input, Select, Space, Table, Tooltip, notification } from "antd";
import { Modal } from "antd";
import { findAllBrand, findAllSubCate, findAllCategory, updateProduct } from "../api/ProductAPi";
import TextArea from "antd/es/input/TextArea";

export default function ModalEditProduct({ product, setProduct, isModalEditOpen, handlerOKModalEdit, handlerCancelModalEdit, fetchData }) {
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
    const onChangeCategory = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }
    const onChangeStatus = (e) => {
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
    }, []);

    const handlerOKEdit = async () => {
        const result = await updateProduct(product);
        console.log(result.status);
        if(result.status != 200) {
            notification.error({
                message : `${result.error.data}`,
            });
            return;
        }
        handlerCancelModalEdit();
        fetchData();
        notification.success({
            message : "Cập nhật thành thành công",
        })
    }

    return (
        <>
            <Modal
                title="Chỉnh sửa thông tin sản phẩm"
                open={isModalEditOpen}
                onOk={handlerOKEdit}
                onCancel={handlerCancelModalEdit}
                okText="Cập nhật"
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
                        onChange={onChange}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Color:</label>
                    <Input
                        className="border border-gray-300 rounded px-3 ml-2 py-1"
                        style={{ height: '33px', width: "80%" }}
                        name="color"
                        value={product.color}
                        onChange={onChange}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Quantity:</label>
                    <Input
                        className="border border-gray-300 rounded px-3 ml-2 py-1"
                        style={{ height: '33px', width: "80%" }}
                        name="quantity"
                        value={product.quantity}
                        onChange={onChange}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Sell Price:</label>
                    <Input
                        className="border border-gray-300 rounded px-3 ml-2 py-1"
                        style={{ height: '33px', width: "80%" }}
                        name="sellPrice"
                        value={product.sellPrice}
                        onChange={onChange}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Origin Price:</label>
                    <Input
                        className="border border-gray-300 rounded px-3 ml-2 py-1"
                        style={{ height: '33px', width: "80%" }}
                        name="originPrice"
                        value={product.originPrice}
                        onChange={onChange}
                    />
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Brand Name:</label>
                    <Select className="ml-2"
                        style={{ height: '33px', width: "80%" }} value={product.brandName}
                        name="brandName"
                        onChange={(value) => onChangeBrand({ target: { name: "brandName", value } })}
                    >
                        {
                            brand.map((brand) => (
                                <Select.Option key={brand.id} value={brand.brandName}>{brand.brandName}</Select.Option>
                            ))
                        }
                    </Select>

                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Subcategory:</label>
                    <Select className="ml-2" style={{ height: '33px', width: "80%" }} value={product.subCate}
                        name="subCate"
                        onChange={(value) => onChangeSubCate({ target: { name: "subCate", value } })}
                    >
                        {
                            subCate.map((subCate) => (
                                <Select.Option key={subCate.id} value={subCate.name}>{subCate.subCateName}</Select.Option>
                            ))
                        }
                    </Select>
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Status:</label>
                    <Select className="ml-2" style={{ height: '33px', width: "80%" }} value={product.status}
                        name="status"
                        onChange={(value) => onChangeStatus({ target: { name: "status", value } })}
                    >
                        <Select.Option value="Còn hàng">Còn hàng</Select.Option>
                        <Select.Option value="Hết hàng">Hết hàng</Select.Option>
                    </Select>
                </div>
                <div className="w-full p-4 flex">
                    <label className="mb-2 text-gray-600 w-28">Description:</label>
                    <TextArea className="ml-2" style={{ width: "80%" }} name="description" value={product.description} onChange={onChange}>

                    </TextArea>
                </div>
            </Modal>
        </>
    )
}