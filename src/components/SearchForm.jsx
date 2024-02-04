// src/components/SearchForm.jsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, AutoComplete, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { getAirports } from "../services/api.js"; // getAirports fonksiyonu API'den havaalanı verilerini alır

const { RangePicker } = DatePicker;

const SearchForm = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    // Havaalanları API'den al ve state'e set et
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

  const handleSearch = (values) => {
    // Form submit edildiğinde ana uygulamaya (ya da isteğinize) bildir
    onSearch(values);
  };

  const handleAirportSearch = (value, type) => {
    const filteredAirports = airports.filter(
      (airport) =>
        airport.code.toLowerCase().includes(value.toLowerCase()) ||
        airport.city.toLowerCase().includes(value.toLowerCase())
    );

    if (type === "departure") {
      // Eğer kalkış havaalanı aranıyorsa, airline bilgilerine göre filtrele
      const filteredByAirline = filteredAirports.filter((airport) =>
        airport.airline.toLowerCase().includes(value.toLowerCase())
      );
      return filteredByAirline.map((airport) => ({
        value: airport.code,
        label: `${airport.code} - ${airport.city}`,
      }));
    }

    if (type === "arrival") {
      // Eğer varış havaalanı aranıyorsa, başka bir kriter kullanabilirsiniz
      // Örneğin, burada "country" bilgisine göre filtreleme yapılıyor
      const filteredByCountry = filteredAirports.filter((airport) =>
        airport.country.toLowerCase().includes(value.toLowerCase())
      );
      return filteredByCountry.map((airport) => ({
        value: airport.code,
        label: `${airport.code} - ${airport.city}`,
      }));
    }

    return filteredAirports.map((airport) => ({
      value: airport.code,
      label: `${airport.code} - ${airport.city}`,
    }));
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSearch}
      initialValues={{
        oneWay: false,
      }}
    >
      <Form.Item
        label="Kalkış Havaalanı"
        name="departureAirport"
        rules={[
          { required: true, message: "Lütfen kalkış havaalanını seçin!" },
        ]}
      >
        <AutoComplete
          airportOptions={(value) => handleAirportSearch(value, "departure")} // options yerine airportOptions kullanıyoruz
          placeholder="Havaalanı kodu veya şehir"
        />
      </Form.Item>
      <Form.Item
        label="Varış Havaalanı"
        name="arrivalAirport"
        rules={[{ required: true, message: "Lütfen varış havaalanını seçin!" }]}
      >
        <AutoComplete
          airportOptions={(value) => handleAirportSearch(value, "arrival")} // options yerine airportOptions kullanıyoruz
          placeholder="Havaalanı kodu veya şehir"
        />
      </Form.Item>
      <Form.Item
        label="Kalkış Tarihi"
        name="departureDate"
        rules={[{ required: true, message: "Lütfen kalkış tarihini seçin!" }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item
        label="Dönüş Tarihi"
        name="returnDate"
        dependencies={["oneWay"]}
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue("oneWay") || value) {
                return Promise.resolve();
              }
              return Promise.reject("Lütfen dönüş tarihini seçin!");
            },
          }),
        ]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={(current) => current && current < moment()}
        />
      </Form.Item>
      <Form.Item label="Tek Yönlü Uçuş" name="oneWay" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
          Ara
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
