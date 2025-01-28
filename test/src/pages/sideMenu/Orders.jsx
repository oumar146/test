import OrdersList from "../../components/orders/OrdersList";
import BaseOfPages from "../../components/BaseOfPages";
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/order/all`);

        // Mettre à jour les catégories
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [refresh]);
    
  return (
    <BaseOfPages>
      {orders && <OrdersList data = {orders} rows={rows} setRows={setRows} refresh={refresh} setRefresh={setRefresh}/>}
      </BaseOfPages>
  );
};

export default Orders;