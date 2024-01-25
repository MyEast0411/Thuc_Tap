import { Button, Input, Modal, Select, Space, Table, Tooltip, notification } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { deleteProduct, filter, findAllBrand, findAllCategory, findAllProduct, findProductById } from "../api/ProductAPi";
import ModalAddProduct from "./ModalAddProduct";
import ModalDetailProduct from "./ModalDetailProduct";
import ModalEditProduct from "./ModalEditProduct";

export default function ProductPage() {
    const [product, setProduct] = useState({
        productName: "",
        color: "",
        quantity: "",
        sellPrice: "",
        originPrice: "",
        brandName: "",
        category: "",
        subCate: "",
        description: "",
    });
    const [productSearch, setProductSearch] = useState({
        productName: "",
        sellPrice: "",
        brandName: "",
        category: "",
        status: "",
    });

    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);

    const [data, setData] = useState([]);
    const colums = [
        {
            title: "No",
            key: "stt",
            dataIndex: "stt",
            sorter: true
        },
        {
            title: "Product Name",
            key: "productName",
            dataIndex: "productName",
            sorter: true
        },
        {
            title: "Brand Name",
            key: "brandName",
            dataIndex: "brandName",
            sorter: true
        },
        {
            title: "Subcategory",
            key: "subcategory",
            dataIndex: "subcategory",
            sorter: true
        },
        {
            title: "Price",
            key: "sellPrice",
            dataIndex: "sellPrice",
            sorter: true
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            sorter: true
        },
        {
            title: "Function",
            key: "function",
            dataIndex: "function",
            render: (index, record) => (
                <Space>
                    <Tooltip arrow={true} title={"Chi tiết"}>
                        <div className="bg-green-300 p-2 rounded-md cursor-pointer"
                            onClick={async () => {
                                const result = await findProductById(record.id);
                                setProduct(result);
                                showModalDetail();
                            }}>
                            <EyeOutlined className="text-gray-800" />
                        </div>
                    </Tooltip>
                    <Tooltip arrow={true} title={"Chỉnh sửa"}>
                        <div className="bg-yellow-300 p-2 rounded-md cursor-pointer"
                            onClick={async () => {
                                const result = await findProductById(record.id);
                                setProduct(result);
                                showModalEdit();
                            }}
                        >
                            <EditOutlined className="text-gray-800" />
                        </div>
                    </Tooltip>

                    <Tooltip arrow={true} title={"Xóa"}>
                        <div className="bg-red-500 p-2 rounded-md cursor-pointer"
                            onClick={() => {
                                setIdDelete(record.id);
                                showComfirm();
                            }}
                        >
                            <DeleteOutlined className="text-gray-800" />
                        </div>

                    </Tooltip>

                </Space>
            )
        }
    ]
    //load table 
    const fetchData = async () => {
        try {
            const result = await findAllProduct();
            const row = result.map((item, index) => ({
                key: index,
                stt: index + 1,
                id: item.id,
                productName: item.productName,
                brandName: item.brandName,
                subcategory: item.subCate,
                sellPrice: item.sellPrice,
                status: item.status
            }))
            setData(row);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchDataBrand = async () => {
            try {
                const result = await findAllBrand();
                setBrand(result);
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
        fetchDataCategory();
        fetchData();
    }, []);

    //modal add product
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    }
    const handlerOKModal = () => {
        setIsModalOpen(false);
    }
    const handlerCancelModal = () => {
        setIsModalOpen(false);
    }

    //modal detail product
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const showModalDetail = () => {
        setIsModalDetailOpen(true);
    }
    const handlerOKModalDetail = () => {
        setIsModalDetailOpen(false);
    }
    const handlerCancelModalDetail = () => {
        setIsModalDetailOpen(false);
    }

    //modal edit product
    const [idDelete, setIdDelete] = useState("");
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const showModalEdit = () => {
        setIsModalEditOpen(true);
    }
    const handlerOKModalEdit = () => {
        setIsModalEditOpen(false);
    }
    const handlerCancelModalEdit = () => {
        setIsModalEditOpen(false);
    }

    // modal comfirm xóa product
    const [isOpenComfirm, setIsOpenComfirm] = useState(false);
    const showComfirm = () => {
        setIsOpenComfirm(true);
    }
    const xacNhanComfirm = async () => {
        const result = await deleteProduct(idDelete);
        console.log(result);
        if (result != true) {
            setIsOpenComfirm(false);
            fetchData();
            cancelComfirm();
            notification.error({
                message: "Xóa thất bại",
            });
            return;
        }
        setIsOpenComfirm(false);
        fetchData();
        cancelComfirm();
        notification.success({
            message: "Xóa thành công",
        })
    }
    const cancelComfirm = () => {
        setIsOpenComfirm(false);
    }

    //filter 
    const onChangeFilter = (e) => {
        setProductSearch({ ...productSearch, [e.target.name]: e.target.value });
    }
    const onChangeSelect = (e) => {
        setProductSearch({ ...productSearch, [e.target.name]: e.target.value });
    }
    const getData = async () => {
        const dataSearch = await filter({
            name: productSearch.productName,
            price : productSearch.sellPrice,
            brand : productSearch.brandName,
            category : productSearch.category,
            status : productSearch.status
        });
        dataSearch.sort((b, a) => b.productId - a.productId);
        const row = dataSearch.map((item, index) => ({
            key: index,
            stt: index + 1,
            id: item.id,
            productName: item.productName,
            brandName: item.brandName,
            subcategory: item.subCate,
            sellPrice: item.sellPrice,
            status: item.status
        }))
        setData(row);
    }
    useEffect(() => {
        getData();
    }, [productSearch]);
    return (
        <>
            <p className="ml-44 mt-5 mb-5" style={{ fontSize: "30px" }}>Product</p>
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                        <label className="block mb-2">Name:</label>
                        <Input name="productName" value={productSearch.name} onChange={onChangeFilter} />
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                        <label className="block mb-2"  >Price:</label>
                        <Input name="sellPrice" value={productSearch.sellPrice} onChange={onChangeFilter}/>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                        <label className="block mb-2">Brand:</label>
                        <Select className="w-full" defaultValue="0"
                            onChange={(value) => onChangeSelect({ target: { name: "brandName", value } })}
                            name="brandName">
                            <Select.Option value="0">Tất cả</Select.Option>
                            {
                                brand.map((brand) => (
                                    <Select.Option key={brand.id} value={brand.id}>{brand.brandName}</Select.Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                        <label className="block mb-2">Category:</label>
                        <Select className="w-full" defaultValue="0"
                            name="category"
                            onChange={(value) => onChangeSelect({ target: { name: "category", value } })}    
                        >
                            <Select.Option value="0">Tất cả</Select.Option>
                            {
                                category.map((cate) => (
                                    <Select.Option key={cate.id} value={cate.id}>{cate.cateName}</Select.Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                        <label className="block mb-2">Status:</label>
                        <Select className="w-full" defaultValue="0" name="status"
                            onChange={(value) => onChangeSelect({ target: { name: "status", value } })}
                        >
                            <Select.Option value="0">Tất cả</Select.Option>
                            <Select.Option value="1">Còn hàng</Select.Option>
                            <Select.Option value="2">Hết hàng</Select.Option>
                        </Select>
                    </div>
                    <Button className="m-4 font-bold h-9" style={{ backgroundColor: "#72B17C" }}
                        onClick={showModal}
                    >Add Product</Button>
                    <ModalAddProduct isModalOpen={isModalOpen} handlerOKModal={handlerOKModal} handlerCancelModal={handlerCancelModal} fetchData={getData} />
                    <ModalDetailProduct product={product} setProduct={setProduct} isModalDetailOpen={isModalDetailOpen} handlerCancelModalDetail={handlerCancelModalDetail} handlerOKModalDetail={handlerOKModalDetail} />
                    <ModalEditProduct product={product} setProduct={setProduct} isModalEditOpen={isModalEditOpen} handlerCancelModalEdit={handlerCancelModalEdit} handlerOKModalEdit={handlerOKModalEdit} fetchData={fetchData} />
                    <Modal
                        title="Xác nhận xóa product"
                        onOk={xacNhanComfirm}
                        onCancel={cancelComfirm}
                        open={isOpenComfirm}
                        okText="Vẫn xóa"
                        cancelText="Hủy"
                        className="mt-52"
                        okButtonProps={{ style: { backgroundColor: 'green', color: 'white' } }}
                    >
                        <p>Bạn có chắc muốn xóa hay không ?</p>
                    </Modal>
                </div>
                <Table columns={colums} dataSource={data} pagination={{ pageSize: 5 }} />
            </div>
        </>
    )
}