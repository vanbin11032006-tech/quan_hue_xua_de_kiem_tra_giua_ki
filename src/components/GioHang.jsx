import { useState, useEffect } from 'react';

export default function useLocalStorage(khoa, giaTriDau) {
  const [giaTri, setGiaTri] = useState(() => {
    try {
      const luuTru = localStorage.getItem(khoa);
      return luuTru ? JSON.parse(luuTru) : giaTriDau;
    } catch (error) {
      return giaTriDau;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(khoa, JSON.stringify(giaTri));
    } catch (error) {
      // Bỏ qua lỗi
    }
  }, [khoa, giaTri]);

  return [giaTri, setGiaTri];
}