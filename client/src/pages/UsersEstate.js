import React, { useState, useEffect } from "react";
import api from "../config/axios";
import { Link } from "react-router-dom";
import "../styles/UsersEstate.css";

const UserEstate = () => {
    const [estates, setEstates] = useState([]);
    useEffect(() => {
        const fetchEstates = async () => {
            try {
                const response = await api.get("/allRealEstateOfCurrentUser");
                // Sử dụng Map để loại bỏ trùng lặp và giữ lại bản ghi đầu tiên của mỗi ID duy nhất
                const uniqueEstatesMap = new Map(
                    response.data.map((estate) => [estate.id, estate])
                );
                // Chuyển Map trở lại thành array để set state
                const uniqueEstates = Array.from(uniqueEstatesMap.values());
                setEstates(uniqueEstates);
            } catch (error) {
                console.error("Error fetching estates:", error);
            }
        };

        fetchEstates();
    }, []);

    return (
        <div>
            <h1>Timeshare của bạn</h1>
            <div className="estates-list">
                {estates.length > 0 ? (
                    estates.map((estate) => (
                        <div key={estate.id} className="estate-item">
                            <h2>{estate.title}</h2>
                            <img
                                src={estate.resources[0]?.url}
                                alt="Estate"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                            <p>{estate.description}</p>
                            <div>Category: {estate.category}</div>
                            <div>Location: {estate.location}</div>
                            <div>Amount: {estate.amount}</div>
                            <div>Price: {estate.price}</div>
                            <div>Check-in: {estate.checkIn}</div>
                            <div>Check-out: {estate.checkOut}</div>
                            <Link to={`/showEstateDetail/${estate.id}`}>
                                View Details
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>You have not listed any estates yet.</p>
                )}
            </div>
        </div>
    );
};

export default UserEstate;