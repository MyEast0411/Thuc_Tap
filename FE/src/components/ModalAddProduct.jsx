import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, Table, Tooltip, notification } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "antd";
import { findAllBrand, findAllSubCate, addProduct } from "../api/ProductAPi";

export default function ModalAddProduct({ isModalOpen, handlerOKModal, handlerCancelModal, fetchData }) {
    const [brand, setBrand] = useState([]);
    const [subCate, setSubCate] = useState([]);
    const [product, setProduct] = useState({
        productName: "",
        color: "",
        quantity: "",
        sellPrice: "",
        originPrice: "",
        brandName: 1,
        subCate: 1
    });
    const [isOpenComfirm, setIsOpenComfirm] = useState(false);
    const showComfirm = () => {
        setIsOpenComfirm(true);
    }
    const xacNhanComfirm = async () => {
        const result = await addProduct(product);
        if (result.status != 200) {
            setIsOpenComfirm(false);
            handlerCancelModal();
            fetchData();
            notification.success({
                message: "Thêm thất bại",
            });
            return;
        }
        setIsOpenComfirm(false);
        handlerCancelModal();
        fetchData();
        notification.success({
            message: "Thêm thành công",
        })
    }
    const cancelComfirm = () => {
        setIsOpenComfirm(false);
    }
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

        fetchDataBrand();
        fetchDataSubCate();
    }, []);
    const handleOKClick = () => {
        showComfirm();
    };

    return (
        <>
            <Modal
                title="Thêm sản phẩm mới"
                open={isModalOpen}
                onOk={handleOKClick}
                onCancel={handlerCancelModal}
                okText="Hoàn tất"
                cancelText="Hủy"
                width={700}
                okButtonProps={{ style: { backgroundColor: 'green', color: 'white' } }}
            >
                <Form>

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
                        <Select className="ml-2 mr-2"
                            style={{ height: '33px', width: "74%" }} defaultValue={brand[0]?.id}
                            name="brandName"
                            onChange={(value) => onChangeBrand({ target: { name: "brandName", value } })}
                        >
                            {
                                brand.map((brand) => (
                                    <Select.Option key={brand.id} value={brand.id}>{brand.brandName}</Select.Option>
                                ))
                            }

                        </Select>
                        <div
                            className="inline-block "
                            style={{
                                backgroundColor: "#00C5CD",
                                borderRadius: "5px",
                                color: "white",
                                cursor: "pointer",
                                width: "32px",
                                height: "32px",
                                padding: "9px",
                            }}
                        >
                            <AiOutlinePlus />
                        </div>
                    </div>
                    <div className="w-full p-4 flex">
                        <label className="mb-2 text-gray-600 w-28">Subcategory:</label>
                        <Select className="ml-2 mr-2" style={{ height: '33px', width: "74%" }} defaultValue={subCate[0]?.id}
                            name="subCate"
                            onChange={(value) => onChangeSubCate({ target: { name: "subCate", value } })}
                        >
                            {/* <Select.Option value="defaultValue">--Chọn Subcategory--</Select.Option> */}
                            {
                                subCate.map((subCate) => (
                                    <Select.Option key={subCate.id} value={subCate.id}>{subCate.subCateName}</Select.Option>
                                ))
                            }
                        </Select>
                        <div
                            className="inline-block "
                            style={{
                                backgroundColor: "#00C5CD",
                                borderRadius: "5px",
                                color: "white",
                                cursor: "pointer",
                                width: "32px",
                                height: "32px",
                                padding: "9px",
                            }}
                        >
                            <AiOutlinePlus />
                        </div>
                    </div>
                </Form>
            </Modal>
            <Modal
                title="Xác nhận thêm product"
                onOk={xacNhanComfirm}
                onCancel={cancelComfirm}
                open={isOpenComfirm}
                okText="Xác nhận"
                cancelText="Hủy"
                className="mt-52"
                okButtonProps={{ style: { backgroundColor: 'green', color: 'white' } }}
            >
                <p>Bạn có chắc muốn thêm hay không ?</p>
            </Modal>
        </>
    )
}