import {Button} from "antd";
import React from "react";
import {Link} from "react-router-dom";

export default function TrangChu() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-4xl font-bold mb-8">Xin chào !</h2>
                <Link to="/productPage">
                    <Button className="text-xl h-16">Product Page</Button>
                </Link>
            </div>
        </>
    )
}