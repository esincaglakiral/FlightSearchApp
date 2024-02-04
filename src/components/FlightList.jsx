import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  AutoComplete,
  Switch,
  Select,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  getAllFlights,
  getFilteredFlights,
  getFlightsByDepartureDate,
  getFlightsByReturnDate,
  sortFlights,
  getFlightDetails,
  getAirports,
} from "../services/api.js";

const { RangePicker } = DatePicker;
const { Option } = Select;

const SearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await getAirports();
        setAirports(response.data);
      } catch (error) {
        console.error("Havaalanları alınamadı", error);
      }
    };

    fetchAirports();
  }, []);

  const handleSearch = async (values) => {
    setLoading(true);

    try {
      // Kullanıcının seçimlerine göre uçuşları getir
      const flights = await getFilteredFlights(
        values.departureAirport,
        values.arrivalAirport
      );

      // Fiyata göre sıralama işlemini gerçekleştir
      const sortedFlights = await sortFlights("price");

      // Diğer işlemleri buraya ekleyebilirsiniz, detay bilgileri almak gibi

      // Ana uygulamaya bildir
      onSearch(sortedFlights.data);
    } catch (error) {
      console.error("Uçuşlar alınamadı", error);
    } finally {
      setLoading(false);
    }
  };

  // Diğer fonksiyonlar...

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSearch}
      initialValues={{
        oneWay: false,
      }}
    >
      {/* Diğer form alanları... */}

      <Form.Item label="Sırala" name="sortBy">
        <Select placeholder="Sırala">
          <Option value="departureTime">Kalkış Saati</Option>
          <Option value="arrivalTime">Varış Saati</Option>
          <Option value="flightDuration">Uçuş Süresi</Option>
          <Option value="price">Fiyat</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          htmlType="submit"
          loading={loading}
        >
          Ara
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
